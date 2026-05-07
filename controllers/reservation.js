const {
  makeReservation,
  reservationList,
  reservationHistory,
  removeReservation,
} = require("../services/reservation");
module.exports.showReservation = async (req, res) => {
  try {
    const resultfinal = await makeReservation(req.body, req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    res.status(404).send("Erreur serveur");
  }
};
module.exports.showList = async (req, res) => {
  try {
    const resultfinal = await reservationList(req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    res.status(404).send("Erreur serveur");
  }
};
module.exports.showHistory = async (req, res) => {
  try {
    const resultfinal = await reservationHistory(req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    res.status(404).send("Erreur serveur");
  }
};
module.exports.showRemove = async (req, res) => {
  try {
    const resultfinal = await removeReservation(req.params, req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    res.status(404).send("Erreur serveur");
  }
};
