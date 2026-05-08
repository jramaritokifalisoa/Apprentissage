const { listUsers, detailsUser, userRemove } = require("../services/users");
module.exports.showListUsers = async (req, res) => {
  try {
    const resultfinal = await listUsers(req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
  console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Erreur serveur"
    });
  
  }
};
module.exports.showDetailUser = async (req, res) => {
  try {
    const resultfinal = await detailsUser(req.params, req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Erreur serveur"
    });
  
  }
};
module.exports.remove = async (req, res) => {
  try {
    const resultfinal = await userRemove(req.params, req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Erreur serveur"
    });
  
  }
};
