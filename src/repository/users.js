const db = require("../db");
module.exports.getAllUsers = async (role) => {
  const result = await db.query("SELECT * FROM users WHERE role = $1", [role]);
  return result;
};
module.exports.userAllDetail = async (id, role) => {
  const result = await db.query(
    "SELECT * FROM users WHERE id = $1 AND role = $2",
    [id, role],
  );
  return result;
};
module.exports.removeAllUser = async (id, role) => {
  const client = await db.connect();
  try {
    await client.query("BEGIN");

    await client.query("DELETE FROM roles WHERE user_id = $1", [id]);

    const result = await client.query(
      "DELETE FROM users WHERE id = $1 AND role = $2 RETURNING *",
      [id, role],
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
