const db = require("../db");
module.exports.getAllUsers = async (roleId) => {
  const query = "SELECT * FROM users WHERE role_id = $1";
  return await db.query(query, [roleId]);
};
module.exports.userAllDetail = async (id, roleId) => {
  const query = "SELECT * FROM users WHERE id = $1 AND role_id = $2";
  return await db.query(query, [id, roleId]);
};
module.exports.removeAllUser = async (id) => {
  const result = await db.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [parseInt(id, 10)], // Sécurité pour s'assurer que c'est un nombre
  );
  return result;
};
