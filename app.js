const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/index.js");
const authRoutes = require("./routes/auth.js");
const apivoyage = require("./routes/voyage.js");
const apireservation = require("./routes/reservation.js");
const app = express();
const port = 5020;
const cors = require("cors");
app.use(
  cors({
    origin: "*", // Ou l'URL de ton Swagger
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // <--- CRUCIAL
  }),
);
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", authRoutes);
app.use("/", apivoyage);
app.use("/", apireservation);
app.listen(port, () => {
  console.log("Serveur démarré " + port);
});
