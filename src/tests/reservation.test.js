import { describe, it, expect, beforeAll, afterAll } from "vitest";
require("dotenv").config();

const reservationService = require("../services/reservation");
const voyageRepository = require("../repository/voyage");
const db = require("../db");

describe("Tests d’Intégration Réels - Gestion des Réservations", () => {
  let fakeAdminUser;
  let fakeNormalUser;
  let testVoyageId;
  let testReservationId;

  beforeAll(async () => {
    fakeAdminUser = { id: 1, name: "Admin Test", role: "admin" };
    fakeNormalUser = { id: 3, name: "Jean Dupont", role: "user" };

    const voyageResult = await voyageRepository.addvoyage(
      "Majunga -> Antananarivo",
      55000,
      20,
    );

    testVoyageId = voyageResult.rows[0].id;
  });

  afterAll(async () => {
    if (testVoyageId) {
      await db.query("DELETE FROM voyages WHERE id = $1", [testVoyageId]);
    }
  });

  it("devrait permettre à un utilisateur de faire une réservation valide", async () => {
    const reservationData = {
      voyage_id: testVoyageId,
      nom: fakeNormalUser.name,
      places: 2,
    };

    const result = await reservationService.makeReservation(
      reservationData,
      fakeNormalUser,
    );

    expect(result.success).toBe("Réservation effectuée avec succès");
    expect(result.data).toBeDefined();

    const rows = result.data.rows ? result.data.rows : [result.data];
    testReservationId = rows[0].id;
  });

  it("devrait refuser la réservation s’il n’y a pas assez de places disponibles", async () => {
    const invalidReservationData = {
      voyage_id: testVoyageId,
      nom: fakeNormalUser.name,
      places: 50,
    };

    await expect(
      reservationService.makeReservation(
        invalidReservationData,
        fakeNormalUser,
      ),
    ).rejects.toThrow(/Désolé, il ne reste que/);
  });

  it("devrait lever une erreur 404 si le voyage n’existe pas", async () => {
    const wrongData = {
      voyage_id: 999999,
      nom: fakeNormalUser.name,
      places: 1,
    };

    await expect(
      reservationService.makeReservation(wrongData, fakeNormalUser),
    ).rejects.toThrow("Voyage introuvable");
  });

  it("devrait retourner la liste complète des réservations si l’utilisateur est admin", async () => {
    const result = await reservationService.reservationList(fakeAdminUser);

    expect(result.success).toBe("Liste complète des réservations");
    expect(result.result).toBeInstanceOf(Array);
  });

  it("devrait retourner uniquement ses propres réservations si l’utilisateur est un simple client", async () => {
    const result = await reservationService.reservationList(fakeNormalUser);

    expect(result.success).toBe("Vos réservations");
    expect(result.result).toBeInstanceOf(Array);
  });

  it("devrait afficher l’historique des réservations du client", async () => {
    const result = await reservationService.reservationHistory(fakeNormalUser);

    expect(result.success).toBe("Historique des réservations");
    expect(result.result).toBeInstanceOf(Array);
  });

  it("devrait permettre à un client (ou un admin) de supprimer sa réservation", async () => {
    if (!testReservationId) return;

    const result = await reservationService.removeReservation(
      { id: testReservationId },
      fakeNormalUser,
    );

    expect(result.success).toBe("Réservation supprimée avec succès");
  });

  it("devrait rejeter la suppression d’une réservation inexistante", async () => {
    await expect(
      reservationService.removeReservation({ id: 888888 }, fakeAdminUser),
    ).rejects.toThrow("Réservation inexistante ou non autorisée");
  });
});
