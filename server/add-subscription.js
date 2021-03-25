const { subscriptions } = require("./db/subscriptions");

exports.addSubscription = (req, res) => {
  subscriptions.push(req.body);
  res.status(200).json({message: 'Usuário inscrito com sucesso!'});
}

