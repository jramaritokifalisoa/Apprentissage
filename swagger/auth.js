module.exports = {
  "/register": {
    post: {
      summary: "Créer un compte",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
                confirmPassword: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Inscription réussie",
        },
      },
    },
  },

  "/login": {
    post: {
      summary: "Connexion utilisateur",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Connexion réussie",
        },
      },
    },
  },

  "/me": {
    get: {
      summary: "Voir profil par nom",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "name",
          in: "query",
          required: true,
          description: "Ici le nom de l'utilisateur à rechercher",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Profil utilisateur trouvé",
        },
      },
    },
  },
  /*"/admin-dashboard": {
    get: {
      summary: "Dashboard Admin",
      security: [{ bearerAuth: [] }], // <--- AUSSI ICI
      responses: { 200: { description: "Succès" } },
    },
  },*/
};
