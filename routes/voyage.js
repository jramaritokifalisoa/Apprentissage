const express = require("express");
const client = require("../config/db");
const {
  setGetV,
  setPostV,
  setGetI,
  setPutI,
  setDeleteI,
} = require("../controllers/voyage");
const router = express.Router();
router.route("/api/voyages").get(setGetV).post(setPostV);

router
  .route("/api/voyages/:id")
  .get(setGetI)

  .put(setPutI)
  .delete(setDeleteI);
module.exports = router;
