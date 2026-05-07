const { listUsers, detailsUser, userRemove } = require("../services/users");
module.exports.showListUsers = async (req, res) => {
  try {
    const resultfinal = await listUsers(req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    res.status(404).send("Erreur serveur");
  }
};
module.exports.showDetailUser = async (req, res) => {
  try {
    const resultfinal = await detailsUser(req.params, req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    res.status(404).send("Erreur serveur");
  }
};
module.exports.remove = async (req, res) => {
  try {
    const resultfinal = await userRemove(req.params, req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    res.status(404).send("Erreur serveur");
  }
};
