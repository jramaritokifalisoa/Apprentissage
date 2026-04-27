const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.js");
const client = require("./db");
const authRoutes = require("./modeles/auth");
const apivoyage = require("./modeles/voyage.js");
const app = express();
const port = 5020;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

client.connect();

app.use("/", authRoutes);
app.use("/", apivoyage);
app.listen(port, () => {
  console.log("Serveur démarré");
});
