---
abbrlink: ''
categories:
- - wrote-by-ai
date: 2024-05-20 00:00:00
tags:
- hexo
title: 在 Hexo 中使用 Service Worker 提高加載速度
updated: 2024-05-20 00:00:00
---
### 在 Hexo 中使用 Service Worker 提高加載速度

Service Worker 是一種在背景中運行的腳本，能夠幫助網站實現離線功能、背景同步和推送通知等功能。通過在 Hexo 中配置 Service Worker，可以顯著提高網站的加載速度和用戶體驗。本文將介紹如何在 Hexo 中使用 `hexo-offline` 插件來實現這一目標。

#### 前提條件

- 已安裝 Node.js 和 npm
- 已安裝 Hexo 並創建了一個 Hexo 博客

### 步驟一：安裝 `hexo-offline` 插件

首先，安裝 `hexo-offline` 插件。這個插件可以自動為你的 Hexo 博客生成和註冊 Service Worker。

```bash
npm install hexo-offline@latest
```

### 步驟二：配置 `hexo-offline`

從 `hexo-offline` v2 開始，插件的配置不再放在 `_config.yml` 中，而是需要在 Hexo 根目錄創建一個新的配置文件 `hexo-offline.config.cjs`。

#### 創建 `hexo-offline.config.cjs`

在 Hexo 根目錄中創建 `hexo-offline.config.cjs` 文件，並將以下內容寫入該文件：

```javascript
module.exports = {
  mode: 'generateSW',
  globPatterns: ['**/*.{html,js,css,png,jpg,jpeg,svg,gif}'],
  swDest: 'public/sw.js',
  runtimeCaching: [
    {
      urlPattern: /\.(?:html|js|css|png|jpg|jpeg|svg|gif)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'hexo-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
  ],
};
```

這段配置將告訴 `workbox` 在生成的靜態文件中查找所有 HTML、JS、CSS、PNG、JPG、JPEG、SVG 和 GIF 文件，並使用 CacheFirst 策略進行緩存。

#### 移除 `_config.yml` 中的 `offline` 配置

確保從 `_config.yml` 文件中移除任何與 `offline` 有關的配置，因為這些配置現在應該在 `hexo-offline.config.cjs` 文件中。

### 步驟三：在 HTML 中註冊 Service Worker

你需要在網站的主 HTML 文件中註冊 Service Worker。在 Hexo 中，你可以通過修改佈局文件來實現這一點。

#### 修改 `head.ejs` 文件

找到並打開主題的 `layout/_partial/head.ejs` 文件，然後在結尾處添加以下腳本代碼來註冊 Service Worker：

```html
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
</script>
```

### 步驟四：重新生成和部署

完成以上配置後，重新生成靜態文件並部署你的 Hexo 網站：

```bash
hexo clean
hexo generate
hexo deploy
```

### 故障排除

在執行 `hexo generate` 時，可能會遇到一些錯誤，例如：

```bash
FATAL Something's wrong. Maybe you can find the solution here: https://hexo.io/docs/troubleshooting.html
Error: [GenerateSW] 'generateSW' property is not expected to be here. Did you mean property 'globPatterns'?
```

這通常是由於配置錯誤導致的。請確保 `hexo-offline.config.cjs` 文件的配置正確，特別是 `mode` 和 `globPatterns` 屬性的使用。

### 總結

通過上述步驟，你可以在 Hexo 中成功配置和使用 Service Worker，從而提高網站的加載速度和用戶體驗。`hexo-offline` 插件使這一過程變得簡單且高效，並提供了靈活的配置選項來滿足不同需求。

如果在配置過程中遇到問題，請參考 [Hexo 官方文檔](https://hexo.io/docs/troubleshooting.html) 或 [hexo-offline 插件的使用說明](https://github.com/JLHwung/hexo-offline#usage)。
