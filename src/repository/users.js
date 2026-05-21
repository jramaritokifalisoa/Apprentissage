const db = require("../db");
module.exports.getAllUsers = async (roleId) => {
  const query = "SELECT * FROM users WHERE role_id = $1";
  return await db.query(query, [roleId]);
};
module.exports.userAllDetail = async (id, roleId) => {
  const query = "SELECT * FROM users WHERE id = $1 AND role_id = $2";
  return await db.query(query, [id, roleId]);
};
module.exports.removeAllUser = async (id, roleId) => {
  const client = await db.connect();
  try {
    await client.query("BEGIN");

    await client.query("DELETE FROM roles WHERE id = $1", [id]);

    const result = await client.query(
      "DELETE FROM users WHERE id = $1 AND role_id = $2 RETURNING *",
      [id, roleId],
    );

    await client.query("COMMIT");

    return result;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};
