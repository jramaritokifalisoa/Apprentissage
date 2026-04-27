const authPaths = require("./modeles/Authswagger");
const voyagePaths = require("./modeles/voyageswagger");
module.exports = {
  openapi: "3.0.0",
  info: {
    title: "API Nodejs",
    version: "1.0.0",
    description: "Mon backend expressjs",
  },
  servers: [
    {
      url: "http://localhost:5020",
    },
  ],
  paths: {
    ...authPaths,
    ...voyagePaths,
  },
};
