const { userRegister, userProfil, userLogin } = require("../services/auth");

module.exports.register = async (req, res) => {
  try {
    const resultfinal = await userRegister(req.body);
    res.status(201).json(resultfinal);
  } catch (err) {
    console.log(err);
    res.status(500).json({message : err.message});
  }
};
module.exports.profil = async (req, res) => {
  try {
    const resultfinal = await userProfil(req.body);
    return res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    return res.status(500).send({message : err.message});
  }
};
module.exports.login = async (req, res) => {
  try {
    const resultfinal = await userLogin(req.body);
    return res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    return res.status(500).send({message : err.message});
  }
};
