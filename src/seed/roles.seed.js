const db = require("../db");
const bcrypt = require("bcrypt");

async function seedDatabase() {
  try {
    const roles = ["user", "admin"];
    for (const role of roles) {
      const checkRole = await db.query("SELECT * FROM roles WHERE name = $1", [
        role,
      ]);
      if (checkRole.rows.length === 0) {
        await db.query("INSERT INTO roles (name) VALUES ($1)", [role]);
        console.log(` Rôle [${role}] ajouté`);
      }
    }

    const adminRoleResult = await db.query(
      "SELECT id FROM roles WHERE name = 'admin'",
    );
    const adminRoleId = adminRoleResult.rows[0].id;

    const defaultAdminEmail = "admin@gmail.com";
    const checkAdmin = await db.query("SELECT * FROM users WHERE email = $1", [
      defaultAdminEmail,
    ]);

    if (checkAdmin.rows.length === 0) {
      const hashedAdminPassword = await bcrypt.hash("AdminPassword2026!", 10);

      await db.query(
        "INSERT INTO users (email, password, role_id) VALUES ($1, $2, $3)",
        [defaultAdminEmail, hashedAdminPassword, adminRoleId],
      );
      console.log(
        ` Compte Administrateur initial créé : ${defaultAdminEmail} / Mot de passe : AdminPassword2026!`,
      );
      console.log(
        " Pensez à modifier ce mot de passe dès votre première connexion !",
      );
    } else {
      console.log("Le compte administrateur existe déjà.");
    }
  } catch (error) {
    console.error("Erreur lors du seeding :", error);
  }
}

module.exports = seedDatabase;
