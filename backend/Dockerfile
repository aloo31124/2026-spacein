# ====================================
# Space-in 空間預約系統 - 後端 Dockerfile
# GCP Cloud Run 部署用
# ====================================
FROM node:20-alpine

WORKDIR /app

# 複製 package 檔案並安裝依賴 (僅 production)
COPY package*.json ./
RUN npm install --omit=dev --no-audit --no-fund

# 複製原始碼 (包含 firestroekey.json 等金鑰)
COPY src/ ./src/
COPY .env .env

# Cloud Run 會以環境變數 PORT 傳入 (預設 8080)，
# 但 src/index.js 內 PORT 硬編碼為 8082，故對外 expose 8082，
# 並透過 Cloud Run 的 --port=8082 對齊。
ENV NODE_ENV=production
ENV PORT=8082

EXPOSE 8082

CMD ["node", "src/index.js"]
