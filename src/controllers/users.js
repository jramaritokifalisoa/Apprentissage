const { listUsers, detailsUser, userRemove } = require("../services/users");
module.exports.showListUsers = async (req, res, next) => {
  try {
    const resultfinal = await listUsers(req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    next(err);
  }
};
module.exports.showDetailUser = async (req, res, next) => {
  try {
    const resultfinal = await detailsUser(req.params, req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    next(err);
  }
};
module.exports.remove = async (req, res, next) => {
  try {
    const resultfinal = await detailsUser(req.params, req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    next(err);
  }
};
