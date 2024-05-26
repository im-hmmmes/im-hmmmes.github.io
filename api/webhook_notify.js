<link rel="stylesheet" class="aplayer-secondary-style-marker" href="\assets\css\APlayer.min.css"><script src="\assets\js\APlayer.min.js" class="aplayer-secondary-script-marker"></script>// api/webhook_notify.js

module.exports = async (req, res) => {
    if (req.method === 'POST') {
      const { name, email, message } = req.body;
  
      const webhookUrl = 'https://discordapp.com/api/webhooks/1243816501933375589/fVMFGnw3PSTogaMBB6VuC1CnW_vchHEkea5b-_7ngtHK3l2aHKcc3hs21FVilHbD43vy';  // 替換為你的 Webhook URL
  
      const data = JSON.stringify({
        name: name,
        email: email,
        message: message
      });
  
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      });
  
      if (response.ok) {
        res.status(200).send('表單提交成功，已通知 Webhook。');
      } else {
        res.status(500).send('Webhook 通知失敗。');
      }
    } else {
      res.status(405).send('方法不被允許');
    }
  };
  