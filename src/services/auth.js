const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const AppError = require("../utils/AppError");
const {
  addUsers,
  getUsers,
  SelectRoleId,
  findEmail,
} = require("../repository/auth");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports.userRegister = async (data) => {
  let { email, password, confirmPassword } = data;
  email = email?.trim().toLowerCase();
  password = password?.trim();
  confirmPassword = confirmPassword?.trim();

  if (!email || !password || !confirmPassword) {
    throw new AppError("Champs obligatoires manquants", 400);
  }

  if (!emailRegex.test(email)) {
    throw new AppError("Format email invalide", 400);
  }

  if (password !== confirmPassword) {
    throw new AppError("Les mots de passe ne correspondent pas", 400);
  }

  const check = await getUsers(email);
  if (check.rows.length > 0) {
    throw new AppError(
      "Si ce compte peut être créé, un email sera envoyé",
      400,
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const roleResult = await SelectRoleId("user");
  if (roleResult.rows.length === 0) {
    throw new AppError("Rôle user introuvable en base de données", 500);
  }

  const roleId = roleResult.rows[0].id;
  const newUser = await addUsers(email, hashedPassword, roleId);

  return {
    success: true,
    message: "Compte créé avec succès",
    data: {
      email: newUser[0].email,
      role: "user",
    },
  };
};

module.exports.userLogin = async (data) => {
  let { email, password } = data;
  email = email?.trim().toLowerCase();
  password = password?.trim();

  if (!email || !password) {
    throw new AppError("Email et mot de passe requis", 400);
  }

  if (!emailRegex.test(email)) {
    throw new AppError("Format email invalide", 400);
  }

  const result = await getUsers(email);

  if (result.rows.length === 0) {
    throw new AppError("Identifiants incorrects", 401);
  }

  const user = result.rows[0];

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    throw new AppError("Identifiants incorrects", 401);
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
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
      email: user.email,
      role: user.role_name,
    },
  };
};

module.exports.userProfil = async (user) => {
  if (!user.email) {
    throw new AppError("Email manquant", 400);
  }

  const result = await findEmail(user.email);
  if (result.rows.length === 0) {
    throw new AppError("Identifiant invalide", 404);
  }

  return {
    success: true,
    message: "Utilisateur trouvé avec succès",
    data: result.rows[0],
  };
};
