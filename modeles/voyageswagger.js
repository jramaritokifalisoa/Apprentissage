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
      summary: "Creer un voyage",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                destination: {
                  type: "string",
                },
                prix: {
                  type: "number",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Contact creer",
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
          description: "ID du voyage",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["destination", "prix"],
              properties: {
                destination: {
                  type: "string",
                },
                prix: {
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
        404: {
          description: "Voyage introuvable",
        },
        400: {
          description: "Données invalides",
        },
      },
    },
  },
};
