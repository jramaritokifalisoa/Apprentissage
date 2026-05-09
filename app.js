const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/index.js");
const authRoutes = require("./routes/auth.js");
const apivoyage = require("./routes/voyage.js");
const apiUsers = require("./routes/users.js");
const apireservation = require("./routes/reservation.js");
const app = express();
const port = 4000;
const cors = require("cors");
app.use(
  cors({
    origin: "https://mon-site-web.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", authRoutes);
app.use("/", apivoyage);
app.use("/", apireservation);
app.use("/", apiUsers);
app.listen(port, () => {
  console.log("Serveur démarré " + port);
});
