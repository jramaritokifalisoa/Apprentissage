const {
  makeReservation,
  reservationList,
  reservationHistory,
  removeReservation,
} = require("../services/reservation");
module.exports.createReservation = async (req, res) => {
  
  try {
    const resultfinal = await makeReservation(req.body, req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Erreur serveur"
    });
    
  }
};
module.exports.showList = async (req, res) => {
  try {
    const resultfinal = await reservationList(req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Erreur serveur"
    });
  
  }
};
module.exports.showHistory = async (req, res) => {
  try {
    const resultfinal = await reservationHistory(req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
     console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Erreur serveur"
    });
  
  }
};
module.exports.removeReservation = async (req, res) => {
  try {
    const resultfinal = await removeReservation(req.params, req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Erreur serveur"
    });
  
  }
};
