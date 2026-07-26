const authPaths = require("./auth");
const voyagePaths = require("./voyage");
const UsersPath = require("./users");
const reservationPaths = require("./reservation");

module.exports = {
  openapi: "3.0.0",
  info: {
    title: "API Nodejs",
    version: "1.0.0",
    description: "Mon backend expressjs",
  },
  servers: [
    {
      url: "http://localhost:4000",
    },
  ],
  paths: {
    ...authPaths,
    ...voyagePaths,
    ...reservationPaths,
    ...UsersPath,
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};
