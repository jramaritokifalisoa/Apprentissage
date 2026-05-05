const express = require("express");
const { setPost, getPost, setLogin } = require("../services/auth");

module.exports.setPosts = async (req, res) => {
  try {
    const resultfinal = await setPost(req.body);
    res.status(201).json(resultfinal);
  } catch (err) {
    console.log(err);
    res.status(400).json("Erreur serveur");
  }
};
module.exports.getPosts = async (req, res) => {
  try {
    const resultfinal = await getPost(req);
    return res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    return res.status(404).send("Erreur serveur");
  }
};
module.exports.Login = async (req, res) => {
  try {
    const resultfinal = await setLogin(req.body);
    return res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    return res.status(404).send("Erreur serveur");
  }
};
