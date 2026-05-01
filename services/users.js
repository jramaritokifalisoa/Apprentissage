const { getUsers, detailUsers } = require("../controllers/users");
module.exports.Users = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({ message: "Veuillez vous connecter !!" });
    }

    const userRole =
      typeof req.user.role === "object" ? req.user.role.name : req.user.role;
    if (userRole !== "admin" && userRole !== "SuperAdmin") {
      return res.status(403).json({
        message: "Accès refusé : seuls les admins peut voir les users",
      });
    }

    const result = await getUsers();
    res.status(200).send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(401).send({ message: "Erreur serveur" });
  }
};
module.exports.details = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.user) {
      return res.status(401).send({ message: "Veuillez vous connecter !!" });
    }

    const userRole =
      typeof req.user.role === "object" ? req.user.role.name : req.user.role;
    if (userRole !== "admin" && userRole !== "SuperAdmin") {
      return res.status(403).json({
        message: "Accès refusé : seuls les admins peut voir les users",
      });
    }
    const result = await detailUsers(id);
    res.status(200).send(result.rows);
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "Erreur serveur!" });
  }
};
