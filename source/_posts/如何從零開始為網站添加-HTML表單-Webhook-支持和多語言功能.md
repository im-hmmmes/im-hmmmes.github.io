---
title: 如何從零開始為網站添加 HTML表單, Webhook 支持和多語言功能
date: 2024-05-25 21:43:38
tags: 
categories: wrote-by-ai
---
[測試](https://imhmm.me/html/gpt-test/250524/ver-3.0/index.html)
## 如何從零開始為網站添加 Webhook 支持和多語言功能

在本文中，我們將從零開始，逐步介紹如何為你的網站添加 Webhook 支持和多語言功能。這包括設置一個基本的 HTML 表單，處理表單提交，將數據發送到 Webhook，並提供繁體中文、簡體中文和英文的多語言支持。

### 一、設置基本的 HTML 表單

首先，我們需要創建一個基本的 HTML 表單，允許用戶提交他們的信息。

#### 1. 創建 `contact.html` 文件

在你的項目目錄中，創建一個名為 `contact.html` 的文件，並添加以下內容：

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title id="page-title">聯絡我</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
            color: #333;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
        }
        .language-selector {
            position: absolute;
            top: 20px;
            right: 20px;
        }
        .about-me, .contact-form {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 600px;
            margin-bottom: 20px;
        }
        .about-me h2, .contact-form h2 {
            margin-top: 0;
            margin-bottom: 15px;
            font-size: 24px;
            text-align: center;
            color: #333;
        }
        .about-me p {
            font-size: 16px;
            line-height: 1.6;
        }
        .contact-form label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        .contact-form input,
        .contact-form textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
        }
        .contact-form button {
            width: 100%;
            padding: 10px;
            border: none;
            background-color: #007BFF;
            color: #fff;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
        }
        .contact-form button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="about-me">
        <h2 id="about-me-title">關於我</h2>
        <p id="about-me-description">這裡是關於你的簡介。你可以在這裡介紹自己，分享你的背景、興趣、專業經歷等。</p>
        <p id="example">例如：</p>
        <p id="example-text">我是某某大學的畢業生，目前從事於某某行業。我喜歡閱讀、旅行和寫作。歡迎通過下方的聯絡方式與我交流。</p>
    </div>

    <div class="contact-form">
        <h2 id="contact-me-title">聯絡我</h2>
        <form action="https://yourdomain.com/webhook_notify.php" method="POST">
            <label for="name" id="label-name">姓名</label>
            <input type="text" id="name" name="name" required>

            <label for="email" id="label-email">電子郵件</label>
            <input type="email" id="email" name="email" required>

            <label for="message" id="label-message">訊息</label>
            <textarea id="message" name="message" rows="4" required></textarea>

            <button type="submit" id="submit-button">提交</button>
        </form>
    </div>
</body>
</html>
```

### 二、處理表單提交並發送 Webhook

接下來，我們需要處理表單提交並將數據發送到 Webhook。

#### 2. 創建 `webhook_notify.php` 文件

在你的項目目錄中，創建一個名為 `webhook_notify.php` 的文件，並添加以下內容：

```php
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = isset($_POST['name']) ? $_POST['name'] : '未提供';
    $email = isset($_POST['email']) ? $_POST['email'] : '未提供';
    $message = isset($_POST['message']) ? $_POST['message'] : '未提供';

    $webhookUrl = 'https://your-webhook-url.com/path';  // 替換為你的 Webhook URL

    $data = json_encode([
        'content' => "姓名: $name\n電子郵件: $email\n訊息: $message"
    ]);

    // 初始化 curl
    $ch = curl_init($webhookUrl);

    // 設置 curl 選項
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

    // 執行 curl 請求
    $result = curl_exec($ch);

    // 檢查 curl 錯誤
    if ($result === FALSE) {
        echo "Curl error: " . curl_error($ch);
    } else {
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if ($httpCode == 200 || $httpCode == 204) { // Discord Webhook returns 204 No Content on success
            echo "表單提交成功，已通知 Webhook。";
        } else {
            echo "Webhook 通知失敗，HTTP 狀態碼: " . $httpCode . ", 返回內容: " . $result;
        }
    }

    // 關閉 curl
    curl_close($ch);
} else {
    echo "方法不被允許";
}
?>
```

### 三、添加多語言支持

為了讓你的網站支持多種語言，我們需要創建語言文件並編寫 JavaScript 來動態加載這些文件。

#### 3. 創建語言文件

在你的項目目錄中創建一個名為 `languages` 的文件夾，並在其中創建三個 JSON 文件：`zh-tw.json`、`zh-cn.json` 和 `en.json`。

##### `languages/zh-tw.json`（繁體中文）

```json
{
    "about_me": "關於我",
    "description": "這裡是關於你的簡介。你可以在這裡介紹自己，分享你的背景、興趣、專業經歷等。",
    "example": "例如：",
    "example_text": "我是某某大學的畢業生，目前從事於某某行業。我喜歡閱讀、旅行和寫作。歡迎通過下方的聯絡方式與我交流。",
    "contact_me": "聯絡我",
    "name": "姓名",
    "email": "電子郵件",
    "message": "訊息",
    "submit": "提交"
}
```

##### `languages/zh-cn.json`（簡體中文）

```json
{
    "about_me": "关于我",
    "description": "这里是关于你的简介。你可以在这里介绍自己，分享你的背景、兴趣、专业经历等。",
    "example": "例如：",
    "example_text": "我是某某大学的毕业生，目前从事于某某行业。我喜欢阅读、旅行和写作。欢迎通过下方的联络方式与我交流。",
    "contact_me": "联络我",
    "name": "姓名",
    "email": "电子邮件",
    "message": "讯息",
    "submit": "提交"
}
```

##### `languages/en.json`（英文）

```json
{
    "about_me": "About Me",
    "description": "This is a brief introduction about yourself. You can introduce yourself here, share your background, interests, professional experience, etc.",
    "example": "For example:",
    "example_text": "I am a graduate of XYZ University, currently working in the XYZ industry. I enjoy reading, traveling, and writing. Feel free to reach out to me through the contact form below.",
    "contact_me": "Contact Me",
    "name": "Name",
    "email": "Email",
    "message": "Message",
    "submit": "Submit"
}
```

#### 4. 修改 `contact.html` 文件

更新你的 `contact.html` 文件以支持語言切換功能：

```html
<!

DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title id="page-title">聯絡我</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
            color: #333;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
        }
        .language-selector {
            position: absolute;
            top: 20px;
            right: 20px;
        }
        .about-me, .contact-form {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 600px;
            margin-bottom: 20px;
        }
        .about-me h2, .contact-form h2 {
            margin-top: 0;
            margin-bottom: 15px;
            font-size: 24px;
            text-align: center;
            color: #333;
        }
        .about-me p {
            font-size: 16px;
            line-height: 1.6;
        }
        .contact-form label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        .contact-form input,
        .contact-form textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
        }
        .contact-form button {
            width: 100%;
            padding: 10px;
            border: none;
            background-color: #007BFF;
            color: #fff;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
        }
        .contact-form button:hover {
            background-color: #0056b3;
        }
    </style>
    <script>
        function changeLanguage(lang) {
            fetch(`/html/gpt-test/250524/ver-3.0/languages/${lang}.json`)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('page-title').innerText = data.contact_me;
                    document.getElementById('about-me-title').innerText = data.about_me;
                    document.getElementById('about-me-description').innerText = data.description;
                    document.getElementById('example').innerText = data.example;
                    document.getElementById('example-text').innerText = data.example_text;
                    document.getElementById('contact-me-title').innerText = data.contact_me;
                    document.getElementById('label-name').innerText = data.name;
                    document.getElementById('label-email').innerText = data.email;
                    document.getElementById('label-message').innerText = data.message;
                    document.getElementById('submit-button').innerText = data.submit;
                });
        }
        document.addEventListener('DOMContentLoaded', () => {
            changeLanguage('zh-tw'); // 預設語言為繁體中文
            document.getElementById('language-selector').addEventListener('change', (e) => {
                changeLanguage(e.target.value);
            });
        });
    </script>
</head>
<body>
    <div class="language-selector">
        <select id="language-selector">
            <option value="zh-tw">繁體中文</option>
            <option value="zh-cn">简体中文</option>
            <option value="en">English</option>
        </select>
    </div>
    <div class="about-me">
        <h2 id="about-me-title">關於我</h2>
        <p id="about-me-description">這裡是關於你的簡介。你可以在這裡介紹自己，分享你的背景、興趣、專業經歷等。</p>
        <p id="example">例如：</p>
        <p id="example-text">我是某某大學的畢業生，目前從事於某某行業。我喜歡閱讀、旅行和寫作。歡迎通過下方的聯絡方式與我交流。</p>
    </div>

    <div class="contact-form">
        <h2 id="contact-me-title">聯絡我</h2>
        <form action="https://yourdomain.com/webhook_notify.php" method="POST">
            <label for="name" id="label-name">姓名</label>
            <input type="text" id="name" name="name" required>

            <label for="email" id="label-email">電子郵件</label>
            <input type="email" id="email" name="email" required>

            <label for="message" id="label-message">訊息</label>
            <textarea id="message" name="message" rows="4" required></textarea>

            <button type="submit" id="submit-button">提交</button>
        </form>
    </div>
</body>
</html>
```

### 四、總結

至此，我們已經完成了一個包含基本表單、Webhook 支持和多語言功能的完整網站設置。我們創建了一個 HTML 表單，處理了表單提交並發送到 Webhook，並使用 JSON 文件和 JavaScript 實現了多語言支持。

這樣，你的網站就能夠根據用戶的語言偏好動態更新內容，並在表單提交後通知 Webhook 進行進一步處理。如果你有任何問題或需要更多幫助，請隨時與我聯繫！