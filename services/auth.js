const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const {
  addUsers,
  getUsers,
  findName,
  checkUsers,
} = require("../repository/auth");
module.exports.userRegister = async (data) => {
  const { name, password, confirmPassword } = data;

  if (!name || !password || !confirmPassword) {
    throw new Error("Erreur de validation");
  }

  if (password !== confirmPassword) {
    throw new Error("Problème avec votre password");
  }

  const check = await getUsers(name);
  const role = 2;
  if (check.rows.length > 0) throw new Error("Utilisateur déjà existant");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await addUsers(name, hashedPassword, role);

  return {
    success: true,
    message: "Utilisateur créé avec succès",
    data: {
      name: newUser[0].name,
      role: "user",
    },
  };
};

module.exports.userProfil = async (user) => {
  if (!user.name) {
    throw new Error("Nom manquant");
  }
  const result = await findName(user.name);
  if (result.rows.length === 0) {
    throw new Error("Identifiant invalide");
  }
  return {
    success: true,
    message: "Utilisateur trouvé avec succès",
    data: result.rows[0],
  };
};
module.exports.userLogin = async (data) => {
  const { name, password } = data;

  if (
    name === process.env.ADMIN_NAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      {
        id: 0,
        name: process.env.ADMIN_NAME,
        role: "admin",
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" },
    );

    return {
      message: "Connexion admin réussie",
      token,
      data: {
        name: process.env.ADMIN_NAME,
        role: "admin",
      },
    };
  }

  const result = await getUsers(name);

  if (result.rows.length === 0) {
    throw new Error("Utilisateur introuvable");
  }

  const user = result.rows[0];

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    throw new Error("Mot de passe incorrect");
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      role: user.role?.name ?? user.role,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" },
  );

  return {
    message: "Connexion réussie",
    token,
    data: user,
  };
};
