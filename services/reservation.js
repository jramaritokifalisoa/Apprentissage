const {
  getVoyageById,
  addReservation,
  getAllReservation,
  getReservation,
  removeAll,
} = require("../repository/reservation");
const AppError = require("../utils/AppError");
module.exports.makeReservation = async (data, user) => {
  const { voyage_id, nom, places } = data;

  if (!user) {
    throw new AppError("Utilisateur non authentifié", 401);
  }

  const nomClient = user.name;

  if (!voyage_id || !nom || !places) {
    throw new AppError("Données manquantes", 400);
  }

  if (
    !Number.isInteger(voyage_id) ||
    !Number.isInteger(places) ||
    voyage_id <= 0 ||
    places <= 0
  ) {
    throw new AppError("Données invalides", 400);
  }

  const voyageCheck = await getVoyageById(voyage_id);

  if (voyageCheck.rows.length === 0) {
    throw new AppError("Voyage introuvable", 404);
  }

  const voyage = voyageCheck.rows[0];

  if (places > voyage.places) {
    throw new AppError(`Désolé, il ne reste que ${voyage.places} places`, 400);
  }

  const reservationResult = await addReservation(voyage_id, nom, places);

  return {
    success: "Réservation effectuée avec succès",
    data: reservationResult,
  };
};

module.exports.reservationList = async (user) => {
  if (!user) {
    throw new AppError("Non authentifié", 401);
  }

  const userRole = typeof user.role === "object" ? user.role.name : user.role;

  if (userRole === "admin" || userRole === "SuperAdmin") {
    const result = await getAllReservation();

    return {
      success: "Liste complète des réservations",
      result: result.rows,
    };
  }

  const result = await getReservation(user.name);

  return {
    success: "Vos réservations",
    result: result.rows,
  };
};

module.exports.reservationHistory = async (user) => {
  if (!user) {
    throw new AppError("Utilisateur non authentifié", 401);
  }

  const result = await getReservation(user.name);

  return {
    success: "Historique des réservations",
    result: result.rows,
  };
};

module.exports.removeReservation = async (data, user) => {
  const { id } = data;

  if (!user) {
    throw new AppError("Veuillez vous connecter", 401);
  }

  const userRole = typeof user.role === "object" ? user.role.name : user.role;

  let resultRemove;

  if (userRole === "admin" || userRole === "SuperAdmin") {
    resultRemove = await removeAll(id);
  } else {
    resultRemove = await removeAll(id, user.name);
  }

  if (resultRemove.rowCount === 0) {
    throw new AppError("Réservation inexistante ou non autorisée", 404);
  }

  return {
    success: "Réservation supprimée avec succès",
    data: resultRemove.rows[0],
  };
};
