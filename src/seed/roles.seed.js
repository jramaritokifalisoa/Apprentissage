// seeds/roles.seed.js
const db = require("../db");

async function seedRoles() {
  const roles = ["user", "admin"];

  for (const role of roles) {
    const check = await db.query("SELECT * FROM roles WHERE name = $1", [role]);

    if (check.rows.length === 0) {
      await db.query("INSERT INTO roles (name) VALUES ($1)", [role]);
      console.log(`${role} ajouté`);
    }
  }
}

module.exports = seedRoles;
