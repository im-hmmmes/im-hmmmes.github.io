<?php
// 獲取表單數據
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// Webhook URL
$webhook_url = 'https://discordapp.com/api/webhooks/1243816501933375589/fVMFGnw3PSTogaMBB6VuC1CnW_vchHEkea5b-_7ngtHK3l2aHKcc3hs21FVilHbD43vy';  // 替換為你的 Webhook URL

// 準備數據
$data = [
    'name' => $name,
    'email' => $email,
    'message' => $message
];

$options = [
    'http' => [
        'header'  => "Content-type: application/json\r\n",
        'method'  => 'POST',
        'content' => json_encode($data),
    ],
];

$context  = stream_context_create($options);
$result = file_get_contents($webhook_url, false, $context);

if ($result === FALSE) {
    echo "Webhook 通知失敗。";
} else {
    echo "表單提交成功，已通知 Webhook。";
}
?>
