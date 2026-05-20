const fs = require("fs");
const path = require("path");
const client = require("../db");

async function runMigrations() {
  try {
    console.log("Connected to PostgreSQL");

    const files = [
      "000_roles.sql",
      "001_users.sql",
      "002_voyages.sql",
      "003_reservations.sql",
    ];

    for (const file of files) {
      const sql = fs.readFileSync(
        path.join(__dirname, "../migration", file),
        "utf-8",
      );

      await client.query(sql);

      console.log(`Executed: ${file}`);
    }

    console.log("All migrations done");
  } catch (err) {
    console.error("Migration error:", err);
    throw err;
  }
}

module.exports = runMigrations;