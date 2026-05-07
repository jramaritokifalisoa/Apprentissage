const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const {
  addUsers,
  getName,
  getId,
  checkUser,
  AddRole,
  AddUser,
} = require("../repository/auth");
module.exports.setRegister = async (data) => {
  const { name, password, confirmPassword } = data;

  if (!name || !password || !confirmPassword) {
    throw new Error("Erreur de validation");
  }
  if (password !== confirmPassword) {
    throw new Error("Problème avec password ou confimPassword");
  }

  const check = await getName(name);
  if (check.rows.length > 0) throw new Error("Utilisateur déjà existant");

  const userCount = await checkUser();
  const role = parseInt(userCount.rows[0].count) === 0 ? "admin" : "user";

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await addUsers(name, hashedPassword, role);

  return {
    success: true,
    message: "Utilisateur créé avec succès",
    data: {
      name: newUser,
      role: role,
    },
  };
};

module.exports.setProfil = async (req) => {
  const { name } = req.query;
  if (!name) {
    throw new Error("Nom manquant");
  }
  const result = await getId(name);
  if (result.rows.length === 0) {
    throw new Error("Identifiant invalide");
  }
  return {
    success: true,
    message: "Utilisateur trouvé avec succès",
    data: result.rows[0],
  };
};

module.exports.setLogin = async (data) => {
  const { name, password } = data;

  if (!name || !password) {
    throw new Error("Nom ou mot de passe manquant");
  }

  const result = await getName(name);

  if (result.rows.length === 0) {
    throw new Error("Utilisateur introuvable");
  }

  const user = result.rows[0];

  const passwordCorrect = await bcrypt.compare(password, user.password);

  if (!passwordCorrect) {
    throw new Error("Mot de passe incorrect");
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      role: user.role.name || user.role,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" },
  );

  return {
    message: "Connexion réussie",
    token: token,
  };
};
