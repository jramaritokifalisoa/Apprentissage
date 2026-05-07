const express = require("express");
const {
  showAllVoayge,
  voyagecreated,
  showVoyage,
  showNewVoyage,
  voyageRemoved,
} = require("../controllers/voyage");
//const { deletePost } = require("../services/voyage");
const { verifyToken, isAdmin } = require("../middleware/index");
const router = express.Router();
router
  .route("/api/voyages")
  .get(showAllVoayge)
  .post(verifyToken, isAdmin, voyagecreated);

router
  .route("/api/voyages/:id")
  .get(showVoyage)

  .put(verifyToken, isAdmin, showNewVoyage)
  .delete(verifyToken, isAdmin, voyageRemoved);
module.exports = router;
