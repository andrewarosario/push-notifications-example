const express = require('express');
const cors = require('cors');
const { addSubscription } = require('./add-subscription');
const { sendNotification } = require('./send-notification');

const app = express();
app.use(express.json());
app.use(cors());

app.route('/add-subscription').post(addSubscription);
app.route('/send-notification').post(sendNotification);

app.listen(9000, () =>
  console.log('Servidor de Push Notifications rodando!')
);
