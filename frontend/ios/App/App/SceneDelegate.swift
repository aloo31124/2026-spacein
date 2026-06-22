import UIKit

// MARK: - SceneDelegate（iOS 13+ UIScene 生命週期，iOS 26 起強制要求）
// Capacitor 使用 Main.storyboard（CAPBridgeViewController），
// UIScene 啟動後 iOS 會自動從 storyboard 建立視圖，此處不需要額外初始化。
class SceneDelegate: UIResponder, UIWindowSceneDelegate {

    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        // iOS 會從 Info.plist 中指定的 storyboard 自動建立視窗，無需手動設定
    }

    func sceneDidDisconnect(_ scene: UIScene) {
        // scene 被系統釋放時呼叫（非終止 app），可在此釋放 scene 相關資源
    }

    func sceneDidBecomeActive(_ scene: UIScene) {
        // scene 進入前景並成為 active
    }

    func sceneWillResignActive(_ scene: UIScene) {
        // scene 即將離開 active 狀態（例如來電、控制中心）
    }

    func sceneWillEnterForeground(_ scene: UIScene) {
        // scene 即將從背景回到前景
    }

    func sceneDidEnterBackground(_ scene: UIScene) {
        // scene 進入背景，可在此儲存資料或釋放資源
    }

}
