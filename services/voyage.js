const {
  getAllVoyage,
  getVoyage,
  addvoyage,
  checkId,
  updateVoyage,
  removeVoyage,
} = require("../repository/voyage");
module.exports.voyageList = async () => {
  const result = await getAllVoyage();
  return result;
};
module.exports.createVoyage = async (data, user) => {
  const { depart , arrivée , prix, Nombre_place } = data;

  if (!user) {
    throw new Error("Utilisateur non authentifié");
  }

  const userRole = typeof user.role === "object" ? user.role.name : user.role;

  if (!depart || !arrivée || !prix || !Nombre_place) {
    throw new Error("Données manquantes");
  }
  if (userRole !== "admin" && userRole !== "SuperAdmin") {
    throw new Error(
      "Accès refusé : Seuls les admins peuvent créer des voyages",
    );
  }
  const destination = `${depart} -> ${arrivée}`;

  const result = await addvoyage(destination, prix, Nombre_place);

  return {
    message: "Voyage créé avec succès",
    data: result.rows[0],
  };
};
module.exports.findVoyage = async (data) => {
  const id = parseInt(data);

  const result = await checkId(id);

  if (result.rows.length === 0) {
    throw new Error("Id inexistant");
  }
  return {
    message: "Resultat des voyages rechercher",
    data: result.rows[0],
  };
};
module.exports.voyageUpdate = async (data, user) => {
  const { depart , arrivée , prix, Nombre_place } = data;
  const { id } = data;

  const userRole = typeof user.role === "object" ? user.role.name : user.role;


  if (!depart , !arrivée || !prix || !Nombre_place) {
    throw new Error("Données manquantes");
  }

  if (userRole !== "admin" && userRole !== "SuperAdmin") {
    throw new Error(
      "Accès refusé : Seuls les admins peuvent modifier des voyages",
    );
  }

  const destination = `${depart} -> ${arrivée}`;
  const result = await updateVoyage(id, destination, prix, Nombre_place);

  if (result.rowCount === 0) {
    throw new Error("Voyage inexistant");
  }

  return {
    message: "Voyage mis à jour avec succès",
    data: result.rows[0],
  };
};
module.exports.voyageRemove = async (data, user) => {
  const { id } = data;

  const userRole = typeof user.role === "object" ? user.role.name : user.role;

  if (userRole !== "admin" && userRole !== "SuperAdmin") {
    throw new Error(
      "Accès refusé : Seuls les admins peuvent supprimer des voyages",
    );
  }

  const resultSup = await removeVoyage(id);

  if (resultSup.rowCount === 0) {
    throw new Error("Voyage inexistant");
  }

  return {
    message: "Voyage supprimé avec succès",
    data: resultSup.rows[0],
  };
};
