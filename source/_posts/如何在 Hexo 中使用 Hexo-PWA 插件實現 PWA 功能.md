---
abbrlink: hexo-pwa
categories:
- - wrote-by-ai
date: '2024-05-20T00:00:00+08:00'
tags:
- hexo
title: 如何在 Hexo 中使用 Hexo-PWA 插件實現 PWA 功能
updated: '2024-05-20T00:00:00+08:00'
---
## 如何在 Hexo 中使用 Hexo-PWA 插件實現 PWA 功能

### 1. 安裝 Hexo-PWA 插件

在進行安裝之前，確保你已經在你的電腦上安裝了 Node.js 和 npm（Node.js 的套件管理器）。進入你的 Hexo 專案目錄，打開終端或命令行，執行以下命令安裝 Hexo-PWA 插件：

```bash
npm install hexo-pwa --save
```

這個命令會自動下載並安裝 Hexo-PWA 插件，同時將其添加到你的 Hexo 專案的依賴中。

### 2. 配置 Hexo-PWA 插件

配置 Hexo-PWA 插件是實現 PWA 功能的關鍵。打開你的 Hexo 專案配置文件 `_config.yml`，並添加以下配置：

```yaml
pwa:
  enable: true
  manifest:
    name: 'Your Site Name'         # 你的網站名稱
    short_name: 'Short Name'       # 簡稱
    start_url: '/'                 # 啟動 URL
    display: 'standalone'          # 應用展示模式（standalone、fullscreen、minimal-ui、browser）
    background_color: '#ffffff'    # 背景顏色
    theme_color: '#333333'         # 主題顏色
  sw: 'service-worker.js'          # 這裡是 Service Worker 檔案的路徑，默認為 'service-worker.js'
```

這裡有一些關於配置的說明：

- `enable`: 設置為 true 以啟用 PWA 功能。
- `manifest`: 在 Web App Manifest 中配置應用的各種參數，包括名稱、簡稱、啟動 URL、展示模式、背景顏色和主題顏色。
- `sw`: 這裡指定了 Service Worker 檔案的路徑。Service Worker 是實現 PWA 功能的核心，它負責緩存資源以實現離線訪問和提高性能。確保這個路徑正確設置是非常重要的。

### 3. 生成靜態資源並部署站點

完成配置後，你需要重新生成你的 Hexo 站點。在終端或命令行中，執行以下命令：

```bash
hexo clean
hexo generate
```

這將生成一個包含 PWA 功能的 Hexo 站點。然後，你可以將生成的靜態資源部署到你的服務器或靜態網站托管服務上：

```bash
hexo deploy
```

### 4. 驗證 PWA 功能

完成部署後，打開你的網站，使用瀏覽器開發者工具（DevTools）中的 "Application" 選項卡來驗證 PWA 功能是否正常工作。在這裡，你可以查看你的站點是否已經被成功添加到主屏幕，以及檢查 Service Worker 是否已經成功註冊。

這就是在 Hexo 中使用 Hexo-PWA 插件實現 PWA 功能的完整步驟。請特別注意確保 Service Worker 路徑的正確設置！希望這對你有所幫助！

---

這次我添加了更多的說明和細節，希望這樣更清楚易懂！
