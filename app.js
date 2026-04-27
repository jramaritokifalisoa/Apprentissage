const express = require("express");
const swaggerUi = require("swagger-ui-express");
const bcrypt = require("bcrypt");
const swaggerDocument = require("./swagger.json");
const client = require("./db");
const app = express();
const port = 5020;

let users = [];
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
client.connect();
app.post("/register", async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.send("Erreur de validation");
  }
  const exist = users.find((u) => u.name == name);
  if (exist) {
    res.send("le nom entrer existe déjà");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await client.query(
        "INSERT INTO express (name, password) VALUES ($1, $2)",
        [name, hashedPassword],
      );

      res.send("Register success");
      users.push({ name, password: hashedPassword });
    } catch (err) {
      console.log("ERREUR POSTGRES:", err.message);
      res.send("Erreur DB ou utilisateur déjà existant");
    }
  }
});

app.post("/login", async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.send("Nom ou mot de passe manquant");
  }
  try {
    const result = await client.query("SELECT * FROM express WHERE name = $1", [
      name,
    ]);
    if (result.rows.length === 0) {
      res.send("Utilisateur introuvable");
    }

    const user = result.rows[0];

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (passwordCorrect) {
      res.send("Connexion réussie");
    } else {
      res.send("Mot de passe incorrect");
    }
  } catch (error) {
    console.log(error);
    res.send("Erreur serveur");
  }
});

app.get("/me", (req, res) => {
  res.send("Mon profile");
});

app.listen(port, () => {
  console.log("Serveur démarré ");
});
