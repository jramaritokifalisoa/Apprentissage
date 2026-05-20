const {
  getAllVoyage,
  getVoyage,
  addvoyage,
  checkId,
  updateVoyage,
  removeVoyage,
} = require("../repository/voyage");
const AppError = require("../utils/AppError");
module.exports.voyageList = async () => {
  const result = await getAllVoyage();
  return result;
};
module.exports.createVoyage = async (data, user) => {
  const { depart, arrivee, prix, Nombre_place } = data;

  if (!user) {
    throw new AppError("Utilisateur non authentifié", 401);
  }

  const userRole = typeof user.role === "object" ? user.role.name : user.role;

  if (!depart || !arrivee || !prix || !Nombre_place) {
    throw new AppError("Données manquantes", 400);
  }

  if (prix <= 0 || Nombre_place <= 0 || isNaN(prix) || isNaN(Nombre_place)) {
    throw new AppError("Données invalides", 400);
  }

  if (userRole !== "admin" && userRole !== "SuperAdmin") {
    throw new AppError(
      "Accès refusé : Seuls les admins peuvent créer des voyages",
      403,
    );
  }
  const destination = `${depart} -> ${arrivee}`;

  const result = await addvoyage(destination, prix, Nombre_place);

  return {
    message: "Voyage créé avec succès",
    data: result.rows[0],
  };
};
module.exports.findVoyage = async (data) => {
  const id = parseInt(data);

  const result = await checkId(id);

  if (!id || id <= 0 || isNaN(id)) {
    throw new AppError("ID invalide", 400);
  }

  if (result.rows.length === 0) {
    throw new AppError("Id inexistant", 404);
  }
  return {
    message: "Resultat des voyages rechercher",
    data: result.rows[0],
  };
};
module.exports.voyageUpdate = async (data, user) => {
  const { depart, arrivee, prix, Nombre_place } = data;
  const { id } = data;

  const userRole = typeof user.role === "object" ? user.role.name : user.role;

  if (!depart || !arrivee || !prix || !Nombre_place) {
    throw new AppError("Données manquantes", 400);
  }

  if (prix <= 0 || Nombre_place <= 0 || isNaN(prix) || isNaN(Nombre_place)) {
    throw new AppError("Prix et places doivent être des nombres positifs", 400);
  }

  if (userRole !== "admin" && userRole !== "SuperAdmin") {
    throw new AppError(
      "Accès refusé : Seuls les admins peuvent modifier des voyages",
      403,
    );
  }

  const destination = `${depart} - ${arrivee}`;
  const result = await updateVoyage(id, destination, prix, Nombre_place);

  if (result.rowCount === 0) {
    throw new AppError("Voyage inexistant", 404);
  }

  return {
    message: "Voyage mis à jour avec succès",
    data: result.rows[0],
  };
};
module.exports.voyageRemove = async (data, user) => {
  const { id } = data;

  if (!id || id <= 0 || isNaN(id)) {
    throw new AppError("ID invalide", 400);
  }

  const userRole = typeof user.role === "object" ? user.role.name : user.role;

  if (userRole !== "admin" && userRole !== "SuperAdmin") {
    throw new AppError(
      "Accès refusé : Seuls les admins peuvent supprimer des voyages",
      403,
    );
  }

  const resultSup = await removeVoyage(id);

  if (resultSup.rowCount === 0) {
    throw new AppError("Voyage inexistant", 404);
  }

  return {
    message: "Voyage supprimé avec succès",
    data: resultSup.rows[0],
  };
};
