const express = require("express");
const router = express.Router();
const voyages = [
  {
    id: 1,
    destination: "Antananarivo",
    prix: 200,
  },
  {
    id: 2,
    destination: "Toamasina",
    prix: 150,
  },
  {
    id: 3,
    destination: "Majunga",
    prix: 110,
  },
  {
    id: 4,
    destination: "Maanakara",
    prix: 170,
  },
];

router.get("/api/voyages", (req, res) => {
  res.send(voyages);
});

router.get("/api/voyages/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const voyage = voyages.find((v) => v.id == id);
  if (voyage) {
    res.send(voyage);
  } else {
    res.send("Id introuvable");
  }
});

module.exports = router;
