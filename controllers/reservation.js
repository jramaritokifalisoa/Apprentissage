const express = require("express");
const { setPost, getPost, getMe, remove } = require("../services/reservation");
module.exports.setPosts = async (req, res) => {
  try {
    const resultfinal = await setPost(req.body, req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    res.status(404).send("Erreur serveur");
  }
};
module.exports.getPosts = async (req, res) => {
  try {
    const resultfinal = await getPost(req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    res.status(404).send("Erreur serveur");
  }
};
module.exports.getme = async (req, res) => {
  try {
    const resultfinal = await getMe(req.user);
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
