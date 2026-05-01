const { response } = require("express");

module.exports = {
  "/api/voyages": {
    get: {
      summary: "Liste des voyages",
      responses: {
        200: {
          description: "Liste récupérée",
        },
      },
    },
    post: {
      summary: "Créer un voyage",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["destination", "prix", "admin_id"],
              properties: {
                destination: {
                  type: "string",
                  example: "Antananarivo",
                },
                prix: {
                  type: "number",
                  example: 200,
                },
                Nombre_place: {
                  type: "number",
                  example: "16 max",
                },
              },
            },
          },
        },
      },

      responses: {
        201: {
          description: "Voyage créé avec succès",
        },

        400: {
          description: "Données manquantes ou invalides",
        },

        404: {
          description: "Admin introuvable",
        },

        500: {
          description: "Erreur serveur",
        },
      },
    },
  },
  "/api/voyages/{id}": {
    get: {
      summary: "Détail d'un voyage",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "number",
          },
          description: "ID du voyage",
        },
      ],
      responses: {
        200: {
          description: "Voyage trouvé",
        },
        404: {
          description: "Voyage introuvable",
        },
      },
    },
    put: {
      summary: "Modifier un voyage",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "number",
          },
          description: "ID du voyage à modifier",
        },
      ],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["destination", "prix", "admin_id"],
              properties: {
                destination: {
                  type: "string",
                  example: "Antananarivo",
                },
                prix: {
                  type: "number",
                },
                Nombre_place: {
                  type: "number",
                },
              },
            },
          },
        },
      },

      responses: {
        200: {
          description: "Voyage modifié avec succès",
        },

        400: {
          description: "Données manquantes",
        },

        403: {
          description: "Non autorisé ou voyage inexistant",
        },

        500: {
          description: "Erreur serveur",
        },
      },
    },
    delete: {
      summary: "Supprimer un voyage",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "number",
          },
          description: "ID du voyage à supprimer",
        },
      ],

      responses: {
        200: {
          description: "Voyage supprimé avec succès",
        },

        400: {
          description: "Données manquantes ou invalides",
        },

        403: {
          description: "Non autorisé ou voyage inexistant",
        },

        404: {
          description: "Voyage introuvable",
        },

        500: {
          description: "Erreur serveur",
        },
      },
    },
  },
};
