const {
  getAllUsers,
  userAllDetail,
  removeAllUser,
} = require("../repository/users");
module.exports.listUsers = async (user) => {
  if (!user) {
    throw new Error({ message: "Veuillez vous connecter !!" });
  }

  const userRole = typeof user.role === "object" ? user.role.name : user.role;
  if (userRole !== "admin" && userRole !== "SuperAdmin") {
    throw new Error({
      message: "Accès refusé : seuls les admins peut voir les users",
    });
  }

  const result = await getAllUsers();
  return {
    message: "Liste des utilisateurs",
    resultat: result.rows,
  };
};
module.exports.detailsUser = async (data, user) => {
  const { id } = data;
  if (!user) {
    throw new Error({ message: "Veuillez vous connecter !!" });
  }

  const userRole = typeof user.role === "object" ? user.role.name : user.role;
  if (userRole !== "admin" && userRole !== "SuperAdmin") {
    throw new Error({
      message: "Accès refusé : seuls les admins peut voir les details users",
    });
  }
  const result = await userAllDetail(id);
  return {
    message: "Détails d'un utilisateur",
    result: result.rows,
  };
};
module.exports.userRemove = async (data, user) => {
  const { id } = data;

  const userRole = typeof user.role === "object" ? user.role.name : user.role;
  if (userRole !== "admin" && userRole !== "SuperAdmin") {
    throw new Error({
      message: "Accès refusé : seuls les admins peuvent suprimer les users",
    });
  }

  const result = await removeAllUser(id);

  if (result.rowCount === 0) {
    throw new Error({ message: "Utilisateur non trouvé" });
  }

  return { message: "Utilisateur et ses données supprimés" };
};
