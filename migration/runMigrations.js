const fs = require("fs");
const path = require("path");
const client = require("../db"); // UNE SEULE SOURCE

async function runMigrations() {
  try {
    // await client.connect();
    console.log("Connected to PostgreSQL");

    const files = ["001_users.sql", "002_voyages.sql", "003_reservations.sql"];

    for (const file of files) {
      const sql = fs.readFileSync(
        path.join(__dirname, "../migration", file),
        "utf-8",
      );

      await client.query(sql);
      console.log(`Executed: ${file}`);
    }

    console.log("All migrations done");

    await client.end();
    process.exit(0);
  } catch (err) {
    console.error("Migration error:", err);
    await client.end();
    process.exit(1);
  }
}

runMigrations();
