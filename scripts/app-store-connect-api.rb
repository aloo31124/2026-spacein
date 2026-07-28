#!/usr/bin/env ruby
# frozen_string_literal: true

require "json"
require "net/http"
require "open3"
require "optparse"
require "time"
require "uri"

DEFAULT_API_ORIGIN = "https://api.appstoreconnect.apple.com"
API_ORIGIN_OVERRIDE_ALLOWED = ENV["ASC_API_TEST_MODE"] == "1"
API_ORIGIN = API_ORIGIN_OVERRIDE_ALLOWED ?
  ENV.fetch("ASC_API_ORIGIN", DEFAULT_API_ORIGIN) :
  DEFAULT_API_ORIGIN
DEFAULT_BUNDLE_ID = "com.spacein"
REVIEW_SUBMITTED_STATES = %w[
  WAITING_FOR_REVIEW
  IN_REVIEW
  ACCEPTED
  PENDING_DEVELOPER_RELEASE
  PENDING_APPLE_RELEASE
  PROCESSING_FOR_APP_STORE
  READY_FOR_SALE
].freeze
REVIEW_FAILED_STATES = %w[
  DEVELOPER_REJECTED
  INVALID_BINARY
  METADATA_REJECTED
  REJECTED
  UNRESOLVED_ISSUES
].freeze

class AppStoreConnectError < StandardError; end

class AppStoreConnectClient
  def initialize(key_id:, issuer_id:, key_path:)
    @key_id = key_id
    @issuer_id = issuer_id
    @key_path = File.expand_path(key_path)
    raise AppStoreConnectError, "找不到 App Store Connect 私鑰：#{@key_path}" unless File.file?(@key_path)
  end

  def app_for_bundle_id(bundle_id)
    apps = get_all("/v1/apps", "filter[bundleId]" => bundle_id, "limit" => "2")
    raise AppStoreConnectError, "App Store Connect 找不到 bundle ID #{bundle_id}。" if apps.empty?
    raise AppStoreConnectError, "bundle ID #{bundle_id} 對應到多個 App，拒絕繼續。" if apps.length != 1

    apps.first
  end

  def versions(app_id)
    app_store_versions = get_all(
      "/v1/appStoreVersions",
      "filter[app]" => app_id,
      "filter[platform]" => "IOS",
      "limit" => "200"
    )
    prerelease_versions = get_all(
      "/v1/preReleaseVersions",
      "filter[app]" => app_id,
      "filter[platform]" => "IOS",
      "limit" => "200"
    )

    (
      app_store_versions.map { |item| item.dig("attributes", "versionString") } +
      prerelease_versions.map { |item| item.dig("attributes", "version") }
    ).compact.uniq
  end

  def next_version(app_id, minimum_version)
    candidates = versions(app_id)
    candidates << minimum_version if minimum_version && !minimum_version.empty?
    highest = candidates.max_by { |value| version_key(value) }
    highest ? bump_version(highest) : "1.0"
  end

  def next_build_number(app_id, version)
    prerelease = prerelease_version(app_id, version)
    return "1" unless prerelease

    builds = get_all(
      "/v1/builds",
      "filter[preReleaseVersion]" => prerelease.fetch("id"),
      "limit" => "200"
    )
    numeric_builds = builds.map do |item|
      value = item.dig("attributes", "version").to_s
      Integer(value, 10) if value.match?(/\A[1-9][0-9]*\z/)
    end.compact
    ((numeric_builds.max || 0) + 1).to_s
  end

  def ensure_app_store_version(app_id, version)
    existing = app_store_versions(app_id, version)
    return existing.first.fetch("id") unless existing.empty?

    response = request(
      :post,
      "/v1/appStoreVersions",
      body: {
        data: {
          type: "appStoreVersions",
          attributes: {
            platform: "IOS",
            versionString: version
          },
          relationships: {
            app: {
              data: {
                type: "apps",
                id: app_id
              }
            }
          }
        }
      }
    )
    response.fetch("data").fetch("id")
  end

  def submit_version_for_review(
    app_id,
    version,
    build_number,
    locale:,
    whats_new:,
    release_type:,
    earliest_release_date:,
    timeout_seconds:,
    poll_seconds:
  )
    app_store_version = exact_app_store_version(app_id, version)
    current_state = app_store_version.dig("attributes", "appStoreState").to_s
    return current_state if REVIEW_SUBMITTED_STATES.include?(current_state)
    if REVIEW_FAILED_STATES.include?(current_state)
      raise AppStoreConnectError,
            "App Store version #{version} 目前不可送審：#{current_state}。"
    end

    build = valid_build(app_id, version, build_number)
    attach_build(app_store_version.fetch("id"), build.fetch("id"))
    update_release_type(
      app_store_version.fetch("id"),
      release_type,
      earliest_release_date
    )
    update_whats_new(app_store_version.fetch("id"), locale, whats_new)

    submission = active_review_submission_for_version(
      app_id,
      app_store_version.fetch("id")
    )
    unless submission
      submission = create_review_submission(app_id)
      add_version_to_review_submission(
        submission.fetch("id"),
        app_store_version.fetch("id")
      )
    end

    submission_state = submission.dig("attributes", "state").to_s
    if submission_state == "READY_FOR_REVIEW"
      submission = request(
        :patch,
        "/v1/reviewSubmissions/#{submission.fetch('id')}",
        body: {
          data: {
            type: "reviewSubmissions",
            id: submission.fetch("id"),
            attributes: {
              submitted: true
            }
          }
        }
      ).fetch("data")
    elsif !%w[WAITING_FOR_REVIEW IN_REVIEW COMPLETE].include?(submission_state)
      raise AppStoreConnectError,
            "App Review submission 狀態不可送出：#{submission_state.empty? ? '未知' : submission_state}。"
    end

    wait_for_review_submission(
      submission.fetch("id"),
      timeout_seconds: timeout_seconds,
      poll_seconds: poll_seconds
    )
  end

  def wait_for_version_review(
    app_id,
    version,
    timeout_seconds:,
    poll_seconds:
  )
    deadline = Time.now + timeout_seconds
    last_state = "尚未出現"

    loop do
      app_store_version = exact_app_store_version(app_id, version)
      state = app_store_version.dig("attributes", "appStoreState").to_s
      last_state = state.empty? ? "未知" : state
      return state if REVIEW_SUBMITTED_STATES.include?(state)
      if REVIEW_FAILED_STATES.include?(state)
        raise AppStoreConnectError,
              "App Store version #{version} 審查失敗：#{state}。"
      end

      break if Time.now >= deadline

      warn "[App Store Connect] version #{version} 審查狀態：#{last_state}，#{poll_seconds} 秒後重試。"
      sleep poll_seconds
    end

    raise AppStoreConnectError,
          "等待 version #{version} 進入審查佇列超時，最後狀態：#{last_state}。"
  end

  def wait_for_build(app_id, version, build_number, timeout_seconds:, poll_seconds:)
    deadline = Time.now + timeout_seconds
    last_state = "尚未出現"

    loop do
      prerelease = prerelease_version(app_id, version)
      if prerelease
        builds = get_all(
          "/v1/builds",
          "filter[preReleaseVersion]" => prerelease.fetch("id"),
          "filter[version]" => build_number,
          "limit" => "2"
        )
        unless builds.empty?
          state = builds.first.dig("attributes", "processingState").to_s
          last_state = state.empty? ? "未知" : state
          return state if state == "VALID"
          if %w[FAILED INVALID].include?(state)
            raise AppStoreConnectError,
                  "App Store Connect build #{version} (#{build_number}) 處理失敗：#{state}。"
          end
        end
      end

      break if Time.now >= deadline

      warn "[App Store Connect] build #{version} (#{build_number}) 狀態：#{last_state}，#{poll_seconds} 秒後重試。"
      sleep poll_seconds
    end

    raise AppStoreConnectError,
          "等待 build #{version} (#{build_number}) 超時，最後狀態：#{last_state}。"
  end

  private

  def app_store_versions(app_id, version)
    get_all(
      "/v1/appStoreVersions",
      "filter[app]" => app_id,
      "filter[platform]" => "IOS",
      "filter[versionString]" => version,
      "limit" => "2"
    )
  end

  def exact_app_store_version(app_id, version)
    versions = app_store_versions(app_id, version)
    raise AppStoreConnectError, "找不到 iOS App Store version #{version}。" if versions.empty?
    if versions.length != 1
      raise AppStoreConnectError,
            "iOS App Store version #{version} 對應到多筆資源，拒絕繼續。"
    end

    versions.first
  end

  def valid_build(app_id, version, build_number)
    prerelease = prerelease_version(app_id, version)
    raise AppStoreConnectError, "找不到 prerelease version #{version}。" unless prerelease

    builds = get_all(
      "/v1/builds",
      "filter[preReleaseVersion]" => prerelease.fetch("id"),
      "filter[version]" => build_number,
      "limit" => "2"
    )
    raise AppStoreConnectError, "找不到 build #{version} (#{build_number})。" if builds.empty?
    if builds.length != 1
      raise AppStoreConnectError,
            "build #{version} (#{build_number}) 對應到多筆資源，拒絕繼續。"
    end

    state = builds.first.dig("attributes", "processingState").to_s
    unless state == "VALID"
      raise AppStoreConnectError,
            "build #{version} (#{build_number}) 尚未通過 Apple 驗證：#{state.empty? ? '未知' : state}。"
    end

    builds.first
  end

  def attach_build(app_store_version_id, build_id)
    request(
      :patch,
      "/v1/appStoreVersions/#{app_store_version_id}/relationships/build",
      body: {
        data: {
          type: "builds",
          id: build_id
        }
      }
    )
  end

  def update_release_type(app_store_version_id, release_type, earliest_release_date)
    allowed = %w[MANUAL AFTER_APPROVAL SCHEDULED]
    unless allowed.include?(release_type)
      raise AppStoreConnectError,
            "release type 必須是 #{allowed.join('、')}：#{release_type}。"
    end
    if release_type == "SCHEDULED"
      if earliest_release_date.to_s.empty?
        raise AppStoreConnectError,
              "release type 為 SCHEDULED 時必須設定 earliest release date。"
      end
      Time.iso8601(earliest_release_date)
    elsif !earliest_release_date.to_s.empty?
      raise AppStoreConnectError,
            "只有 SCHEDULED 可設定 earliest release date。"
    end

    attributes = { releaseType: release_type }
    attributes[:earliestReleaseDate] = earliest_release_date if release_type == "SCHEDULED"
    request(
      :patch,
      "/v1/appStoreVersions/#{app_store_version_id}",
      body: {
        data: {
          type: "appStoreVersions",
          id: app_store_version_id,
          attributes: attributes
        }
      }
    )
  rescue ArgumentError
    raise AppStoreConnectError,
          "earliest release date 必須是 ISO 8601：#{earliest_release_date}。"
  end

  def update_whats_new(app_store_version_id, locale, whats_new)
    normalized = whats_new.to_s.strip
    raise AppStoreConnectError, "版本更新說明不得為空。" if normalized.empty?
    raise AppStoreConnectError, "版本更新說明不得超過 4,000 字元。" if normalized.length > 4_000

    localizations = get_all(
      "/v1/appStoreVersions/#{app_store_version_id}/appStoreVersionLocalizations",
      "limit" => "200"
    )
    localization = localizations.find do |item|
      item.dig("attributes", "locale") == locale
    end
    localization ||= localizations.first if localizations.length == 1
    unless localization
      available = localizations.map { |item| item.dig("attributes", "locale") }.compact
      raise AppStoreConnectError,
            "找不到 locale #{locale} 的 App Store version localization；現有：#{available.join('、')}。"
    end

    request(
      :patch,
      "/v1/appStoreVersionLocalizations/#{localization.fetch('id')}",
      body: {
        data: {
          type: "appStoreVersionLocalizations",
          id: localization.fetch("id"),
          attributes: {
            whatsNew: normalized
          }
        }
      }
    )
  end

  def active_review_submission_for_version(app_id, app_store_version_id)
    submissions = get_all(
      "/v1/apps/#{app_id}/reviewSubmissions",
      "include" => "appStoreVersionForReview",
      "limit" => "200"
    )
    active_states = %w[
      READY_FOR_REVIEW
      WAITING_FOR_REVIEW
      IN_REVIEW
      UNRESOLVED_ISSUES
      CANCELING
      COMPLETING
    ]
    submissions.find do |submission|
      next false unless active_states.include?(submission.dig("attributes", "state"))

      direct_version_id = submission.dig(
        "relationships",
        "appStoreVersionForReview",
        "data",
        "id"
      )
      direct_version_id == app_store_version_id ||
        review_submission_contains_version?(
          submission.fetch("id"),
          app_store_version_id
        )
    end
  end

  def review_submission_contains_version?(submission_id, app_store_version_id)
    items = get_all(
      "/v1/reviewSubmissions/#{submission_id}/items",
      "include" => "appStoreVersion",
      "limit" => "50"
    )
    items.any? do |item|
      item.dig("relationships", "appStoreVersion", "data", "id") ==
        app_store_version_id
    end
  end

  def create_review_submission(app_id)
    request(
      :post,
      "/v1/reviewSubmissions",
      body: {
        data: {
          type: "reviewSubmissions",
          attributes: {
            platform: "IOS"
          },
          relationships: {
            app: {
              data: {
                type: "apps",
                id: app_id
              }
            }
          }
        }
      }
    ).fetch("data")
  end

  def add_version_to_review_submission(submission_id, app_store_version_id)
    request(
      :post,
      "/v1/reviewSubmissionItems",
      body: {
        data: {
          type: "reviewSubmissionItems",
          relationships: {
            reviewSubmission: {
              data: {
                type: "reviewSubmissions",
                id: submission_id
              }
            },
            appStoreVersion: {
              data: {
                type: "appStoreVersions",
                id: app_store_version_id
              }
            }
          }
        }
      }
    )
  end

  def wait_for_review_submission(submission_id, timeout_seconds:, poll_seconds:)
    deadline = Time.now + timeout_seconds
    last_state = "尚未出現"

    loop do
      submission = request(:get, "/v1/reviewSubmissions/#{submission_id}").fetch("data")
      state = submission.dig("attributes", "state").to_s
      last_state = state.empty? ? "未知" : state
      return state if %w[WAITING_FOR_REVIEW IN_REVIEW COMPLETE].include?(state)
      if %w[UNRESOLVED_ISSUES CANCELING].include?(state)
        raise AppStoreConnectError,
              "App Review submission #{submission_id} 送審失敗：#{state}。"
      end

      break if Time.now >= deadline

      warn "[App Store Connect] submission #{submission_id} 狀態：#{last_state}，#{poll_seconds} 秒後重試。"
      sleep poll_seconds
    end

    raise AppStoreConnectError,
          "等待 App Review submission #{submission_id} 超時，最後狀態：#{last_state}。"
  end

  def prerelease_version(app_id, version)
    get_all(
      "/v1/preReleaseVersions",
      "filter[app]" => app_id,
      "filter[platform]" => "IOS",
      "filter[version]" => version,
      "limit" => "2"
    ).first
  end

  def get_all(path, params = {})
    resources = []
    next_url = build_uri(path, params)

    while next_url
      response = request(:get, next_url)
      resources.concat(response.fetch("data"))
      next_url = response.dig("links", "next")
    end

    resources
  end

  def request(method, path_or_url, body: nil)
    uri = path_or_url.start_with?("http") ? URI(path_or_url) : URI.join(API_ORIGIN, path_or_url)
    request_class = {
      get: Net::HTTP::Get,
      post: Net::HTTP::Post,
      patch: Net::HTTP::Patch
    }.fetch(method)
    http_request = request_class.new(uri)
    http_request["Authorization"] = "Bearer #{jwt}"
    http_request["Accept"] = "application/json"
    if body
      http_request["Content-Type"] = "application/json"
      http_request.body = JSON.generate(body)
    end

    response = Net::HTTP.start(
      uri.hostname,
      uri.port,
      use_ssl: uri.scheme == "https",
      open_timeout: 30,
      read_timeout: 60
    ) { |http| http.request(http_request) }
    parsed = response.body.to_s.empty? ? {} : JSON.parse(response.body)
    return parsed if response.code.to_i.between?(200, 299)

    details = Array(parsed["errors"]).map do |error|
      [error["code"], error["title"], error["detail"]].compact.join("：")
    end
    message = details.empty? ? response.body.to_s[0, 500] : details.join("；")
    raise AppStoreConnectError, "App Store Connect API #{response.code}：#{message}"
  rescue JSON::ParserError => error
    raise AppStoreConnectError, "App Store Connect API 回傳非 JSON：#{error.message}"
  end

  def jwt
    return @jwt if @jwt

    command = [
      "xcrun", "altool", "--generate-jwt",
      "--api-key", @key_id,
      "--api-issuer", @issuer_id,
      "--p8-file-path", @key_path,
      "--output-format", "json"
    ]
    stdout, stderr, status = Open3.capture3(*command)
    unless status.success?
      raise AppStoreConnectError,
            "無法產生 App Store Connect JWT：#{stderr.lines.last.to_s.strip}"
    end

    @jwt = extract_jwt(stdout)
    raise AppStoreConnectError, "altool 未回傳可辨識的 JWT。" unless @jwt

    @jwt
  end

  def extract_jwt(output)
    parsed = JSON.parse(output)
    find_jwt(parsed)
  rescue JSON::ParserError
    output[/\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/]
  end

  def find_jwt(value)
    case value
    when String
      value if value.match?(/\AeyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\z/)
    when Array
      value.each do |item|
        token = find_jwt(item)
        return token if token
      end
      nil
    when Hash
      value.each_value do |item|
        token = find_jwt(item)
        return token if token
      end
      nil
    end
  end

  def build_uri(path, params)
    uri = URI.join(API_ORIGIN, path)
    uri.query = URI.encode_www_form(params)
    uri.to_s
  end

  def version_key(value)
    value.to_s.split(".").map { |part| Integer(part, 10) }
  rescue ArgumentError
    [-1]
  end

  def bump_version(value)
    parts = value.split(".")
    raise AppStoreConnectError, "無法自動升版：#{value}" unless parts.all? { |part| part.match?(/\A[0-9]+\z/) }

    parts[-1] = (parts[-1].to_i + 1).to_s
    parts.join(".")
  end
end

options = {
  bundle_id: DEFAULT_BUNDLE_ID,
  timeout: 1_800,
  poll: 30
}
parser = OptionParser.new do |opts|
  opts.on("--bundle-id VALUE") { |value| options[:bundle_id] = value }
  opts.on("--minimum VALUE") { |value| options[:minimum] = value }
  opts.on("--version VALUE") { |value| options[:version] = value }
  opts.on("--build VALUE") { |value| options[:build] = value }
  opts.on("--locale VALUE") { |value| options[:locale] = value }
  opts.on("--whats-new VALUE") { |value| options[:whats_new] = value }
  opts.on("--release-type VALUE") { |value| options[:release_type] = value }
  opts.on("--earliest-release-date VALUE") { |value| options[:earliest_release_date] = value }
  opts.on("--timeout VALUE", Integer) { |value| options[:timeout] = value }
  opts.on("--poll VALUE", Integer) { |value| options[:poll] = value }
end

begin
  if ENV["ASC_API_ORIGIN"] && !API_ORIGIN_OVERRIDE_ALLOWED
    raise AppStoreConnectError,
          "ASC_API_ORIGIN 只能在 ASC_API_TEST_MODE=1 時覆寫。"
  end
  command = ARGV.shift
  parser.parse!(ARGV)
  %w[ASC_KEY_ID ASC_ISSUER_ID ASC_KEY_PATH].each do |name|
    raise AppStoreConnectError, "必要環境變數 #{name} 未設定。" if ENV[name].to_s.empty?
  end

  client = AppStoreConnectClient.new(
    key_id: ENV.fetch("ASC_KEY_ID"),
    issuer_id: ENV.fetch("ASC_ISSUER_ID"),
    key_path: ENV.fetch("ASC_KEY_PATH")
  )
  app = client.app_for_bundle_id(options.fetch(:bundle_id))
  app_id = app.fetch("id")

  case command
  when "app-id"
    puts app_id
  when "next-version"
    puts client.next_version(app_id, options[:minimum])
  when "next-build"
    raise AppStoreConnectError, "--version 為必填。" if options[:version].to_s.empty?
    puts client.next_build_number(app_id, options.fetch(:version))
  when "ensure-version"
    raise AppStoreConnectError, "--version 為必填。" if options[:version].to_s.empty?
    puts client.ensure_app_store_version(app_id, options.fetch(:version))
  when "verify-build"
    raise AppStoreConnectError, "--version 為必填。" if options[:version].to_s.empty?
    raise AppStoreConnectError, "--build 為必填。" if options[:build].to_s.empty?
    puts client.wait_for_build(
      app_id,
      options.fetch(:version),
      options.fetch(:build),
      timeout_seconds: options.fetch(:timeout),
      poll_seconds: options.fetch(:poll)
    )
  when "submit-review"
    raise AppStoreConnectError, "--version 為必填。" if options[:version].to_s.empty?
    raise AppStoreConnectError, "--build 為必填。" if options[:build].to_s.empty?
    raise AppStoreConnectError, "--locale 為必填。" if options[:locale].to_s.empty?
    raise AppStoreConnectError, "--whats-new 為必填。" if options[:whats_new].to_s.empty?
    puts client.submit_version_for_review(
      app_id,
      options.fetch(:version),
      options.fetch(:build),
      locale: options.fetch(:locale),
      whats_new: options.fetch(:whats_new),
      release_type: options[:release_type] || "AFTER_APPROVAL",
      earliest_release_date: options[:earliest_release_date],
      timeout_seconds: options.fetch(:timeout),
      poll_seconds: options.fetch(:poll)
    )
  when "verify-review"
    raise AppStoreConnectError, "--version 為必填。" if options[:version].to_s.empty?
    puts client.wait_for_version_review(
      app_id,
      options.fetch(:version),
      timeout_seconds: options.fetch(:timeout),
      poll_seconds: options.fetch(:poll)
    )
  else
    raise AppStoreConnectError,
          "未知指令。支援：app-id、next-version、next-build、ensure-version、verify-build、submit-review、verify-review。"
  end
rescue AppStoreConnectError, OptionParser::ParseError => error
  warn "[App Store Connect] 錯誤：#{error.message}"
  exit 1
end
