const express = require("express");
const {
  showAllVoyage,
  voyagecreated,
  showVoyage,
  updateVoyage,
  voyageRemoved,
} = require("../controllers/voyage");

const { verifyToken, isAdmin } = require("../middleware/index");
const router = express.Router();
router
  .route("/api/voyages")
  .get(showAllVoyage)
  .post(verifyToken, isAdmin, voyagecreated);

router
  .route("/api/voyages/:id")
  .get(showVoyage)

  .put(verifyToken, isAdmin, updateVoyage)
  .delete(verifyToken, isAdmin, voyageRemoved);
module.exports = router;
