const { userRegister, userProfil, userLogin } = require("../services/auth");

module.exports.register = async (req, res, next) => {
  try {
    const result = await userRegister(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports.profil = async (req, res, next) => {
  try {
    const result = await userProfil(req.user);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const result = await userLogin(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
