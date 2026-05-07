const { getUsers, detailUsers, remove } = require("../repository/users");
module.exports.Users = async (user) => {
  if (!user) {
    throw new Error({ message: "Veuillez vous connecter !!" });
  }

  const userRole = typeof user.role === "object" ? user.role.name : user.role;
  if (userRole !== "admin" && userRole !== "SuperAdmin") {
    throw new Error({
      message: "Accès refusé : seuls les admins peut voir les users",
    });
  }

  const result = await getUsers();
  return {
    message: "Liste des utilisateurs",
    resultat: result.rows,
  };
};
module.exports.details = async (data, user) => {
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
  const result = await detailUsers(id);
  return {
    message: "Détails d'un utilisateur",
    result: result.rows,
  };
};
module.exports.remove = async (data, user) => {
  const { id } = data;

  const userRole = typeof user.role === "object" ? user.role.name : user.role;
  if (userRole !== "admin" && userRole !== "SuperAdmin") {
    throw new Error({
      message: "Accès refusé : seuls les admins peuvent suprimer les users",
    });
  }

  const result = await remove(id);

  if (result.rowCount === 0) {
    throw new Error({ message: "Utilisateur non trouvé" });
  }

  return { message: "Utilisateur et ses données supprimés" };
};
