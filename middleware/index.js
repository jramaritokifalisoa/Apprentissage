const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports.isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Authentification requise" });
  }

  const roleRaw =
    typeof req.user.role === "object" ? req.user.role.name : req.user.role;
  const role = roleRaw?.toLowerCase().trim();
  console.log("DEBUG ROLE DANS MIDDLEWARE :", role);

  if (role === "admin" || role === "SuperAdmin") {
    next();
  } else {
    return res.status(403).json({
      message: `Accès refusé : Seuls les admins sont autorisés.`,
    });
  }
};
module.exports.verifyToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).send("Token manquant");
  }

  const parts = header.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).send("Format token invalide");
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Erreur JWT précise :", error.message);
    return res.status(401).send("Token invalide");
  }
};
