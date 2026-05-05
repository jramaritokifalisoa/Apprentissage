const express = require("express");
const { Users, details, remove } = require("../services/users");
module.exports.User = async (req, res) => {
  try {
    const resultfinal = await Users(req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    res.status(404).send("Erreur serveur");
  }
};
module.exports.detail = async (req, res) => {
  try {
    const resultfinal = await details(req.params, req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    res.status(404).send("Erreur serveur");
  }
};
module.exports.removes = async (req, res) => {
  try {
    const resultfinal = await remove(req.params, req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    res.status(404).send("Erreur serveur");
  }
};
