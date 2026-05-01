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
