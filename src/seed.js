const seedRoles = require("./seed/roles.seed");
const runMigrations = require("./migration/runMigrations");

async function initDatabase() {
  try {
    console.log("Étape 1 : Exécution des migrations...");

    await runMigrations();
    console.log(" Migrations appliquées avec succès.");

    console.log(" Étape 2 : Lancement du seeding...");

    await seedRoles();
    console.log("Seed terminé avec succès !");

    process.exit(0);
  } catch (err) {
    console.error(" Une erreur est survenue lors de l'initialisation :", err);
    process.exit(1);
  }
}

initDatabase();
