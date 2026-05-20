const db = require("../db");

module.exports.getAllVoyage = async (destination) => {
  if (destination && destination.length > 0) {
    const queryText =
      "SELECT * FROM voyages WHERE destination ILIKE $1 ORDER BY id ASC";

    const values = [`%${destination}%`];

    const result = await db.query(queryText, values);
    return result.rows;
  } else {
    const result = await db.query("SELECT * FROM voyages ORDER BY id ASC");
    return result.rows;
  }
};
module.exports.getVoyage = async (id) => {
  const result = await db.query(
    'SELECT id, name, "role" FROM users WHERE id = $1',
    [id],
  );
  return result;
};
module.exports.addvoyage = async (destination, prix, Nombre_place) => {
  const result = await db.query(
    "INSERT INTO voyages(destination, prix, places) VALUES($1, $2, $3) RETURNING *",
    [destination, prix, Nombre_place],
  );
  return result;
};
module.exports.checkId = async (id) => {
  const result = await db.query("SELECT * FROM voyages WHERE id = $1", [id]);
  return result;
};
module.exports.updateVoyage = async (id, destination, prix, Nombre_place) => {
  const result = await db.query(
    "UPDATE voyages SET destination = $1, prix = $2, places = $3 WHERE id = $4 RETURNING *",
    [destination, prix, Nombre_place, id],
  );
  return result;
};
module.exports.removeVoyage = async (id) => {
  const result = await db.query(
    "DELETE FROM voyages WHERE id = $1 RETURNING *",
    [id],
  );
  return result;
};
