const db = require("../db");
module.exports.getAllUsers = async () => {
  const result = await db.query("SELECT * FROM users WHERE role = $1", [
    "user",
  ]);
  return result;
};
module.exports.detailUsers = async (id) => {
  const result = await db.query(
    "SELECT * FROM users WHERE id = $1 AND role = $2",
    [id, "user"],
  );
  return result;
};
module.exports.removeUser = async (id) => {
  await db.query("BEGIN");

  await db.query("DELETE FROM roles WHERE user_id = $1", [id]);

  const result = await db.query(
    "DELETE FROM users WHERE id = $1 AND role = $2 RETURNING *",
    [id, "user"],
  );

  await db.query("COMMIT");

  return result;
};
