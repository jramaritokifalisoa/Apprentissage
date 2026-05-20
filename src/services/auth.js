const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const AppError = require("../utils/AppError");
const {
  addUsers,
  getUsers,
  findName,
  SelectRoleId,
  checkUsers,
} = require("../repository/auth");
module.exports.userRegister = async (data) => {
  const { name, password, confirmPassword } = data;

  if (!name || !password || !confirmPassword) {
    throw new AppError("Utilisateur non authentifié", 401);
  }

  if (password !== confirmPassword) {
    throw new AppError("Les mots de passe ne correspondent pas", 400);
  }

  const check = await getUsers(name);
  if (check.rows.length > 0) {
    throw new AppError("Utilisateur déjà existant", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // 🔥 GET ROLE ID from DB (IMPORTANT)
  const roleResult = await SelectRoleId("user");

  if (roleResult.rows.length === 0) {
    throw new AppError("Role user introuvable (seed manquant)", 500);
  }

  const roleId = roleResult.rows[0].id;

  const newUser = await addUsers(name, hashedPassword, roleId);

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
    throw new AppError("Nom manquant", 400);
  }
  const result = await findName(user.name);
  if (result.rows.length === 0) {
    throw new AppError("Identifiant invalide", 404);
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

  const result = await getUsers(name, true);

  if (result.rows.length === 0) {
    throw new AppError("Utilisateur introuvable", 404);
  }

  const user = result.rows[0];

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    throw new AppError("Mot de passe incorrect", 400);
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      role: user.role_name,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" },
  );

  return {
    message: "Connexion réussie",
    token,
    data: {
      id: user.id,
      name: user.name,
      role: user.role_name,
    },
  };
};
