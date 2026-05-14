const {
  makeReservation,
  reservationList,
  reservationHistory,
  removeReservation,
} = require("../services/reservation");
module.exports.createReservation = async (req, res, next) => {
  try {
    const resultfinal = await makeReservation(req.body, req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    next(err);
  }
};
module.exports.showList = async (req, res, next) => {
  try {
    const resultfinal = await reservationList(req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    next(err);
  }
};
module.exports.showHistory = async (req, res, next) => {
  try {
    const resultfinal = await reservationHistory(req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    next(err);
  }
};
module.exports.removeReservation = async (req, res, next) => {
  try {
    const resultfinal = await removeReservation(req.params, req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    next(err);
  }
};
