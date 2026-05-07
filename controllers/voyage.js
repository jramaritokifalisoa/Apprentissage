const {
  voyageList,
  createVoyage,
  findVoyage,
  voyageUpdate,
  voyageRemove,
} = require("../services/voyage");

module.exports.showAllVoayge = async (req, res) => {
  try {
    const resultfinal = await voyageList();
    res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    res.status(404).send("Erreur serveur");
  }
};
module.exports.voyagecreated = async (req, res) => {
  try {
    const resultfinal = await createVoyage(req.body, req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    res.status(404).send("Erreur serveur");
  }
};
module.exports.showVoyage = async (req, res) => {
  try {
    const resultfinal = await findVoyage(req.params.id);
    res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    res.status(404).send("Erreur serveur");
  }
};
module.exports.showNewVoyage = async (req, res) => {
  try {
    const voyageData = { id: req.params.id, ...req.body };
    const resultfinal = await voyageUpdate(voyageData, req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    res.status(404).send("Erreur serveur");
  }
};
module.exports.voyageRemoved = async (req, res) => {
  try {
    const resultfinal = await voyageRemove(req.params, req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    res.status(404).send("Erreur serveur");
  }
};
