import { describe, it, expect, beforeEach } from "vitest";
require("dotenv").config();

const usersService = require("../services/users");

describe("Tests d’Intégration Réels - Gestion des Utilisateurs", () => {
  let fakeAdminUser;
  let fakeNormalUser;
  let testUserId;

  beforeEach(() => {
    fakeAdminUser = { id: 1, email: "admin@gmail.com", role: "admin" };
    fakeNormalUser = { id: 3, email: "user@gmail.com", role: "user" };
  });

  it("devrait permettre à un admin de voir la liste des utilisateurs", async () => {
    const result = await usersService.listUsers(fakeAdminUser);

    expect(result.message).toBe("Liste des utilisateurs");
    expect(result.resultat).toBeDefined();
    expect(result.resultat).toBeInstanceOf(Array);

    if (result.resultat.length > 0) {
      const normalUser = result.resultat.find(
        (u) => u.email !== "admin@gmail.com",
      );
      if (normalUser) {
        testUserId = normalUser.id;
      }
    }
  });

  it("devrait refuser l’accès à la liste si l’utilisateur n’est pas connecté", async () => {
    await expect(usersService.listUsers(null)).rejects.toThrow(
      "Veuillez vous connecter !!",
    );
  });

  it("devrait refuser l’accès à la liste si l’utilisateur n’est pas admin", async () => {
    await expect(usersService.listUsers(fakeNormalUser)).rejects.toThrow(
      "Accès refusé : seuls les admins peut voir les users",
    );
  });

  it("devrait permettre à un admin de voir les détails d’un utilisateur spécifique", async () => {
    const idToTest = testUserId || 3;

    const result = await usersService.detailsUser(
      { id: idToTest },
      fakeAdminUser,
    );

    expect(result.message).toBe("Détails d'un utilisateur");
    expect(result.result).toBeDefined();
    expect(result.result).toBeInstanceOf(Array);
  });

  it("devrait refuser de voir les détails si l’utilisateur connecté n’est pas admin", async () => {
    const idToTest = testUserId || 3;

    await expect(
      usersService.detailsUser({ id: idToTest }, fakeNormalUser),
    ).rejects.toThrow(
      "Accès refusé : seuls les admins peut voir les details users",
    );
  });

  it("devrait refuser la suppression si l’utilisateur connecté n’est pas admin", async () => {
    const idToTest = testUserId || 3;

    await expect(
      usersService.userRemove({ id: idToTest }, fakeNormalUser),
    ).rejects.toThrow(
      "Accès refusé : seuls les admins peuvent suprimer les users",
    );
  });

  it("devrait retourner une erreur 404 si l’admin tente de supprimer un ID inexistant", async () => {
    const fakeInexistentId = 999999;

    await expect(
      usersService.userRemove({ id: fakeInexistentId }, fakeAdminUser),
    ).rejects.toThrow("Utilisateur non trouvé");
  });
  // NOTE : On évite de supprimer systématiquement un utilisateur valide du seed à chaque test
  // pour ne pas casser tes autres tests d'intégration (comme la connexion de l'utilisateur normal).
  // Si tu souhaites tester la vraie suppression, tu peux décommenter le test ci-dessous.
  /*
  it('devrait permettre à un admin de supprimer un utilisateur', async () => {
    if (testUserId) {
      const result = await usersService.userRemove({ id: testUserId }, fakeAdminUser);
      expect(result.message).toBe("Utilisateur et ses données supprimés");
    }
  });
  */
});
