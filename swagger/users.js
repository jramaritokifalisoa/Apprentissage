module.exports = {
  "/api/users": {
    get: {
      summary: "Liste des utilisateurs",
      responses: {
        200: {
          description: "Users distribuer avec succès",
        },
        401: {
          description: "Erreur serveur!",
        },
      },
    },
  },
  "/api/users/{id}": {
    get: {
      summary: "Détails d'un utilisateur",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "number",
          },
          description: "ID de l'utilisateur",
        },
      ],
      responses: {
        200: {
          description: "utilisateur trouvé",
        },
        404: {
          description: "utilisateur introuvable",
        },
      },
    },
    delete: {
      summary: "suprimer un utilisateur",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "number",
          },
          description: "ID de l'utilisateur",
        },
      ],
      responses: {
        200: {
          description: "utilisateur trouvé",
        },
        404: {
          description: "utilisateur introuvable",
        },
      },
    },
  },
};
