const db = require("../db");

module.exports.getVoyageById = async (id) => {
  return await db.query("SELECT * FROM voyages WHERE id = $1", [id]);
};

module.exports.addReservation = async (voyage_id, nom, places) => {
  const result = await db.query(
    "INSERT INTO reservations(voyage_id, nom, places) VALUES($1, $2, $3) RETURNING *",
    [voyage_id, nom, places],
  );
  return result;
};
module.exports.setAdmin = async () => {
  const result = await db.query(
    `SELECT r.*, v.destination 
       FROM reservations r
       JOIN voyages v ON r.voyage_id = v.id
       ORDER BY r.id ASC`,
  );
  return result;
};
module.exports.getAll = async (nom) => {
  const result = await db.query(
    `SELECT 
        r.id,
        r.nom,
        r.places,
        r.created_at,
        v.id AS voyage_id,
        v.destination,
        v.prix
     FROM reservations r
     JOIN voyages v ON r.voyage_id = v.id
     WHERE r.nom = $1
     ORDER BY r.id DESC`,
    [nom],
  );
  return result;
};
module.exports.removeAll = async (id, nom) => {
  const result = await db.query(
    "DELETE FROM reservations WHERE id = $1 AND nom = $2 RETURNING *",
    [id, nom],
  );
  return result;
};
