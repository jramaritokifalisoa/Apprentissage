import { describe, it, expect, beforeEach } from "vitest";
require("dotenv").config();

const voyageService = require("../services/voyage");

describe("Tests d’Intégration Réels - Gestion des Voyages", () => {
  let fakeAdminUser;
  let fakeNormalUser;
  let testVoyageId;

  beforeEach(() => {
    fakeAdminUser = { id: 1, email: "admin@gmail.com", role: "admin" };
    fakeNormalUser = { id: 3, email: "user@gmail.com", role: "user" };
  });

  it("devrait permettre à un admin de créer un voyage valide", async () => {
    const voyageData = {
      depart: "Antananarivo",
      arrivee: "Tamatave",
      prix: 45000,
      Nombre_place: 18,
    };

    const result = await voyageService.createVoyage(voyageData, fakeAdminUser);

    expect(result.message).toBe("Voyage créé avec succès");
    expect(result.data).toBeDefined();
    expect(result.data.id).toBeDefined();

    testVoyageId = result.data.id;
  });

  it("devrait refuser la création si l’utilisateur n’est pas admin", async () => {
    const voyageData = {
      depart: "Fianarantsoa",
      arrivee: "Majunga",
      prix: 60000,
      Nombre_place: 14,
    };

    await expect(
      voyageService.createVoyage(voyageData, fakeNormalUser),
    ).rejects.toThrow(
      "Accès refusé : Seuls les admins peuvent créer des voyages",
    );
  });

  it("devrait lever une erreur 400 si des données sont manquantes ou négatives", async () => {
    const invalidData = {
      depart: "Toliara",
      arrivee: "Antsirabe",
      prix: -5000,
      Nombre_place: 10,
    };

    await expect(
      voyageService.createVoyage(invalidData, fakeAdminUser),
    ).rejects.toThrow();
  });

  it("devrait lister tous les voyages ou filtrer par destination", async () => {
    const result = await voyageService.voyageList({
      destination: "Antananarivo",
    });

    expect(result).toBeDefined();

    if (Array.isArray(result)) {
      expect(result).toBeInstanceOf(Array);
    } else {
      expect(result.rows).toBeInstanceOf(Array);
    }
  });

  it("devrait trouver un voyage spécifique grâce à son ID", async () => {
    expect(testVoyageId).toBeDefined();

    const result = await voyageService.findVoyage(testVoyageId);

    expect(result.message).toBe("Resultat des voyages rechercher");
    expect(result.data.id).toBe(testVoyageId);
  });

  it("devrait permettre à un admin de modifier un voyage existant", async () => {
    expect(testVoyageId).toBeDefined();

    const updateData = {
      id: testVoyageId,
      depart: "Antananarivo",
      arrivee: "Tamatave",
      prix: 50000,
      Nombre_place: 15,
    };

    const result = await voyageService.voyageUpdate(updateData, fakeAdminUser);

    expect(result.message).toBe("Voyage mis à jour avec succès");
    expect(result.data).toBeDefined();
  });

  it("devrait permettre à un admin de supprimer le voyage", async () => {
    expect(testVoyageId).toBeDefined();

    const result = await voyageService.voyageRemove(
      { id: testVoyageId },
      fakeAdminUser,
    );

    expect(result.message).toBe("Voyage supprimé avec succès");

    await expect(voyageService.findVoyage(testVoyageId)).rejects.toThrow(
      "Id inexistant",
    );
  });
});
