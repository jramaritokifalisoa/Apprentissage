const db = require("../db");

module.exports.checkUsers = async () => {
  const result = await db.query("SELECT COUNT(*) FROM users");
  return result;
};

module.exports.getUsers = async (email) => {
  const result = await db.query(
    `SELECT users.*, roles.name AS role_name
     FROM users
     JOIN roles ON users.role_id = roles.id
     WHERE users.email = $1`,
    [email],
  );
  return result;
};

module.exports.addUsers = async (email, hashedPassword, roleId) => {
  const result = await db.query(
    `INSERT INTO users(email, password, role_id)
     VALUES($1, $2, $3)
     RETURNING email;`,
    [email, hashedPassword, roleId],
  );
  return result.rows;
};

module.exports.SelectRoleId = async (roleName) => {
  const result = await db.query("SELECT id FROM roles WHERE name = $1", [
    roleName,
  ]);
  return result;
};

module.exports.findEmail = async (email) => {
  const query = `
    SELECT id, email, role_id
    FROM users
    WHERE email = $1
  `;
  const result = await db.query(query, [email]);
  return result;
};
