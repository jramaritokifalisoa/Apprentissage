const db = require("../db");
module.exports.getUsers = async (name) => {
  const result = await db.query(
    `SELECT users.*, roles.name as role_name
     FROM users
     JOIN roles ON users.role_id = roles.id
     WHERE users.name = $1`,
    [name],
  );

  return result;
};
module.exports.addUsers = async (name, hashedPassword, role = "user") => {
  const result = await db.query(
    "INSERT INTO users(name, password,role_id) VALUES($1, $2, $3) RETURNING name;",
    [name, hashedPassword, role],
  );
  return result.rows;
};

module.exports.findName = async (name) => {
  const query = `SELECT id, name, role_id FROM users WHERE name = $1`;
  const result = await db.query(query, [name]);
  return result;
};
module.exports.checkUsers = async () => {
  const result = await db.query("SELECT COUNT(*) FROM users");
  return result;
};
module.exports.SelectRoleId = async (user) => {
  const result = await db.query("SELECT id FROM roles WHERE name = $1", [
    "user",
  ]);
  return result;
};
