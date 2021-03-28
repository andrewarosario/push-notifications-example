const webpush = require('web-push');
const { actionNotification } = require('./notifications/action-notification');
const { subscriptions } = require("./db/subscriptions");

exports.sendNotification = async (req, res) => {

  const notificationPayload = { notification: actionNotification };

  // console.log(webpush.generateVAPIDKeys());
  const vapidDetails = {
    subject: 'mailto:seu-email@mail.com',
    publicKey: 'BBl5Vw0PCEM8nbonAjahMaBPAR3MEibrU-zwkXHd0vp_bL4w43ej_K41pLBWOIjCW_3TnotZvskdY_Xmg0Hde3I',
    privateKey: 'QHznI0Lrhm5c8ByTsuNyuJKZamqo7qSXwuyBfSD7sIs'
  }

  for (const subscription of subscriptions) {
    await webpush.sendNotification(
      subscription,
      JSON.stringify(notificationPayload),
      { vapidDetails }
    );
  }

  res.status(200).json({message: 'Notificações enviadas!'});
}

