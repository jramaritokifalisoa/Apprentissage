const {
  getAllUsers,
  userAllDetail,
  removeAllUser,
} = require("../repository/users");
const AppError = require("../utils/AppError");
module.exports.listUsers = async (user) => {
  if (!user) {
    throw new AppError("Veuillez vous connecter !!", 401);
  }

  const userRole = typeof user.role === "object" ? user.role.name : user.role;
  if (userRole !== "admin" && userRole !== "SuperAdmin") {
    throw new AppError(
      "Accès refusé : seuls les admins peut voir les users",
      403,
    );
  }

  const result = await getAllUsers(2);
  return {
    message: "Liste des utilisateurs",
    resultat: result.rows,
  };
};
module.exports.detailsUser = async (data, user) => {
  const { id } = data;
  if (!user) {
    throw new AppError("Veuillez vous connecter !!", 401);
  }

  const userRole = typeof user.role === "object" ? user.role.name : user.role;
  if (userRole !== "admin" && userRole !== "SuperAdmin") {
    throw new AppError(
      "Accès refusé : seuls les admins peut voir les details users",
      400,
    );
  }
  const result = await userAllDetail(id, 2);
  return {
    message: "Détails d'un utilisateur",
    result: result.rows,
  };
};
module.exports.userRemove = async (data, user) => {
  const { id } = data;

  const userRole = typeof user.role === "object" ? user.role.name : user.role;
  if (userRole !== "admin" && userRole !== "SuperAdmin") {
    throw new AppError(
      "Accès refusé : seuls les admins peuvent suprimer les users",
      403,
    );
  }

  const result = await removeAllUser(id, 2);

  if (result.rowCount === 0) {
    throw new AppError("Utilisateur non trouvé", 404);
  }

  return { message: "Utilisateur et ses données supprimés" };
};
