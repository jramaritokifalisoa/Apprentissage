const client = require("../db");
module.exports.getUsers = async () => {
  const result = await client.query("SELECT * FROM users WHERE role = $1", [
    "user",
  ]);
  return result;
};
module.exports.detailUsers = async (id) => {
  const result = await client.query(
    "SELECT * FROM users WHERE id = $1 AND role = $2",
    [id, "user"],
  );
  return result;
};
module.exports.remove = async (id) => {
  try {
    await client.query("BEGIN");

    await client.query("DELETE FROM roles WHERE user_id = $1", [id]);

    const result = await client.query(
      "DELETE FROM users WHERE id = $1 AND role = $2 RETURNING *",
      [id, "user"],
    );

    await client.query("COMMIT");

    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Erreur lors de la suppression :", error);
    throw error;
  }
};
