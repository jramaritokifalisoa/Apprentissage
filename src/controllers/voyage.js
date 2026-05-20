const {
  voyageList,
  createVoyage,
  findVoyage,
  voyageUpdate,
  voyageRemove,
} = require("../services/voyage");

module.exports.showAllVoyage = async (req, res, next) => {
  try {
    console.log("==> QUERY REÇUE DANS LE CONTROLEUR :", req.query);
    const resultfinal = await voyageList(req.query);
    res.status(200).send(resultfinal);
  } catch (err) {
    next(err);
  }
};
module.exports.voyagecreated = async (req, res, next) => {
  try {
    const resultfinal = await createVoyage(req.body, req.user);
    res.status(201).send(resultfinal);
  } catch (err) {
    next(err);
  }
};
module.exports.showVoyage = async (req, res, next) => {
  try {
    const resultfinal = await findVoyage(req.params.id);
    res.status(200).send(resultfinal);
  } catch (err) {
    next(err);
  }
};
module.exports.updateVoyage = async (req, res, next) => {
  try {
    const voyageData = { id: req.params.id, ...req.body };
    const resultfinal = await voyageUpdate(voyageData, req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    next(err);
  }
};
module.exports.voyageRemoved = async (req, res, next) => {
  try {
    const resultfinal = await voyageRemove(req.params, req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    next(err);
  }
};
