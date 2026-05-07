const { setRegister, setProfil, setLogin } = require("../services/auth");

module.exports.register = async (req, res) => {
  try {
    const resultfinal = await setRegister(req.body);
    res.status(201).json(resultfinal);
  } catch (err) {
    console.log(err);
    res.status(400).json("Erreur serveur");
  }
};
module.exports.profil = async (req, res) => {
  try {
    const resultfinal = await setProfil(req);
    return res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    return res.status(404).send("Erreur serveur");
  }
};
module.exports.login = async (req, res) => {
  try {
    const resultfinal = await setLogin(req.body);
    return res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    return res.status(404).send("Erreur serveur");
  }
};
