import { describe, it, expect, beforeEach } from "vitest";
require("dotenv").config();

const authService = require("../services/auth");
const jwt = require("jsonwebtoken");

describe("Tests d'Intégration Réels - userLogin", () => {
  beforeEach(() => {
    if (!process.env.SECRET_KEY) {
      process.env.SECRET_KEY = "Moi";
    }
  });

  it("devrait réussir à connecter un admin réel présent en BDD", async () => {
    const credentials = {
      email: "admin@gmail.com",
      password: "AdminPassword2026!",
    };

    const result = await authService.userLogin(credentials);

    expect(result.message).toBe("Connexion réussie");
    expect(result.token).toBeDefined();
    expect(result.data.email).toBe("admin@gmail.com");
    expect(result.data.role).toBe("admin");

    const decoded = jwt.verify(result.token, process.env.SECRET_KEY);
    expect(decoded.email).toBe("admin@gmail.com");
    expect(decoded.role).toBe("admin");
  });

  it("devrait rejeter la connexion si le mot de passe est erroné", async () => {
    await expect(
      authService.userLogin({
        email: "admin@gmail.com",
        password: "mauvais_mot_de_passe",
      }),
    ).rejects.toThrow("Identifiants incorrects");
  });

  it("devrait rejeter la connexion si l'email n'existe pas du tout", async () => {
    await expect(
      authService.userLogin({
        email: "compte_inexistant_du_futur@gmail.com",
        password: "AnyPassword123!",
      }),
    ).rejects.toThrow("Identifiants incorrects");
  });
});
