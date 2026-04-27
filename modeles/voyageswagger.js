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
  },
};
