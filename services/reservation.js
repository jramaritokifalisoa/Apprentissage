const {
  getVoyageById,
  addReservation,
  getAllReservation,
  getReservation,
  removeAll,
} = require("../repository/reservation");
module.exports.makeReservation = async (data, user) => {
  const { voyage_id, places } = data;

  const nomClient = user.name;

  if (!voyage_id || !places) {
    throw new Error("Données manquantes (ID voyage ou places)");
  }

  const voyageCheck = await getVoyageById(voyage_id);

  if (voyageCheck.rows.length === 0) {
    throw new Error("Le voyage que vous voulez réserver n'existe pas");
  }

  const reservationResult = await addReservation(voyage_id, nomClient, places);

  return {
    message: "Réservation effectuée avec succès",
    data: reservationResult.rows[0],
  };
};
module.exports.reservationList = async (user) => {
  if (!user) {
    throw new Error("Non authentifié");
  }

  const userRole = typeof user.role === "object" ? user.role.name : user.role;

  if (userRole !== "admin" && userRole !== "SuperAdmin") {
    throw new Error(
      "Accès refusé : Seuls les admins peuvent voir la liste des réservations",
    );
  }

  const result = await getAllReservation();

  return {
    message: "Voici la liste des reservations",
    result: result.rows,
  };
};
module.exports.reservationHistory = async (user) => {
  if (!user) {
    throw new Error("Accès refusé ou Utilisateur non authentifié");
  }
  const nomUtilisateur = user.name;

  const result = await getReservation(nomUtilisateur);

  return {
    message: "Historique des reservations",
    result: result.rows,
  };
};
module.exports.removeReservation = async (data, user) => {
  const { id } = data;

  if (!user) {
    throw new Error("Veuillez vous connecter !!");
  }
  const nomUtilisateur = user.name;

  const resultRemove = await removeAll(id, nomUtilisateur);

  if (resultRemove.rowCount === 0) {
    throw new Error("Réservation inexistante ou non autorisée !");
  }

  return {
    message: "Réservation supprimée avec succès",
    data: resultRemove.rows[0],
  };
};
