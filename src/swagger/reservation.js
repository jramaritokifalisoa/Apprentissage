const { response } = require("express");
module.exports = {
  "/api/reservation": {
    post: {
      summary: "Créer une réservation",
      
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["voyage_id", "nom", "places"],
              properties: {
                voyage_id: {
                  type: "number",
                  description: "ID du voyage",
                },
                nom: {
                  type: "string",
                  description: "Nom du client",
                },
                places: {
                  type: "number",
                  description: "Nombre de places réservées",
                  example: 2,
                },
              },
            },
          },
        },
      },

      responses: {
        201: {
          description: "Réservation créée avec succès",
        },

        400: {
          description: "Données manquantes",
        },

        404: {
          description: "Voyage introuvable",
        },

        500: {
          description: "Erreur serveur",
        },
      },
    },
    get: {
      summary: "Liste des réservations",
      responses: {
        200: {
          description: "Liste des réservations récupérée",
        },

        400: {
          description: "admin_id manquant",
        },

        500: {
          description: "Erreur serveur",
        },
      },
    },
  },
  "/api/reservations/me": {
    get: {
      summary: "Historique de toutes les réservations utilisateur",
      responses: {
        200: {
          description: "Liste des réservations récupérée avec succès",
        },

        500: {
          description: "Erreur serveur",
        },
      },
    },
  },
  "/api/reservations/{id}": {
    delete: {
      summary: "Annuler une reservation",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "number",
          },
          description: "ID du reservation à annuler",
        },
      ],

      responses: {
        200: {
          description: "Reservation annuler avec succès",
        },

        500: {
          description: "Erreur serveur",
        },
      },
    },
  },
};
