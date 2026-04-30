const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports.isAdmin = (req, res, next) => {
  console.log("Rôle de l'utilisateur :", req.user.role);

  // On vérifie si c'est un objet (comme dans ton log) ou une string
  const roleName =
    typeof req.user.role === "object" ? req.user.role.name : req.user.role;

  // Attention : Ton log affiche "SuperAdmin", pas "admin"
  if (req.user && (roleName === "admin" || roleName === "SuperAdmin")) {
    next();
  } else {
    res.status(403).json({
      error: "Accès refusé",
      message: `Requis: admin, Reçu: ${roleName}`,
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
