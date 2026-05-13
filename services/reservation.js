const {
  getVoyageById,
  addReservation,
  getAllReservation,
  getReservation,
  removeAll,
} = require("../repository/reservation");

module.exports.makeReservation = async (data, user) => {
  const { voyage_id, places } = data;

  if (!user) {
    throw new Error("Utilisateur non authentifié");
  }

  const nomClient = user.name;

  if (!voyage_id || !places) {
    throw new Error("Données manquantes");
  }

  const voyageCheck = await getVoyageById(voyage_id);

  if (voyageCheck.rows.length === 0) {
    throw new Error("Voyage introuvable");
  }

  const voyage = voyageCheck.rows[0];

  if (places > voyage.places) {
    throw new Error(
      `Désolé, il ne reste que ${voyage.places} places`
    );
  }

  const reservationResult = await addReservation(
    voyage_id,
    nomClient,
    places
  );

  return {
    success: "Réservation effectuée avec succès",
    data: reservationResult.rows[0],
  };
};

module.exports.reservationList = async (user) => {
  if (!user) {
    throw new Error("Non authentifié");
  }

  const userRole =
    typeof user.role === "object"
      ? user.role.name
      : user.role;

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
    throw new Error("Utilisateur non authentifié");
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
    throw new Error("Veuillez vous connecter");
  }

  const userRole =
    typeof user.role === "object"
      ? user.role.name
      : user.role;

  let resultRemove;

  if (userRole === "admin" || userRole === "SuperAdmin") {
    resultRemove = await removeAll(id);
  } else {

    resultRemove = await removeAll(id, user.name);
  }

  if (resultRemove.rowCount === 0) {
    throw new Error(
      "Réservation inexistante ou non autorisée"
    );
  }

  return {
    success: "Réservation supprimée avec succès",
    data: resultRemove.rows[0],
  };
};