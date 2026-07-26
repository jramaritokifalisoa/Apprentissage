const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/index.js");
const authRoutes = require("./routes/auth.js");
const apivoyage = require("./routes/voyage.js");
const apiUsers = require("./routes/users.js");
const apireservation = require("./routes/reservation.js");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerOptions = {
  customCssUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
  customJs: [
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js",
  ],
};

// Intégration des options dans le setup de Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerOptions),
);

app.use("/", authRoutes);
app.use("/", apivoyage);
app.use("/", apireservation);
app.use("/", apiUsers);

async function startServer() {
  try {
    if (process.env.NODE_ENV !== "production") {
      app.listen(port, () => {
        console.log("Serveur démarré en local sur le port " + port);
      });
    }
  } catch (error) {
    console.error("Impossible de démarrer :", error);
  }
}

startServer();

module.exports = app;
