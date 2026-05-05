const express = require("express");
const {
  getPost,
  setPost,
  getPostI,
  editPost,
  deletes,
} = require("../services/voyage");

module.exports.getPosts = async (req, res) => {
  try {
    const resultfinal = await getPost();
    res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    res.status(404).send("Erreur serveur");
  }
};
module.exports.setPosts = async (req, res) => {
  try {
    const resultfinal = await setPost(req.body, req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    res.status(404).send("Erreur serveur");
  }
};
module.exports.getPostII = async (req, res) => {
  try {
    const resultfinal = await getPostI(req.params.id);
    res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    res.status(404).send("Erreur serveur");
  }
};
module.exports.editPosts = async (req, res) => {
  try {
    const voyageData = { id: req.params.id, ...req.body };
    const resultfinal = await editPost(voyageData, req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    res.status(404).send("Erreur serveur");
  }
};
module.exports.remove = async (req, res) => {
  try {
    //const voyageData = {id: req.params.id, ...req.body}
    const resultfinal = await deletes(req.params, req.user);
    res.status(200).send(resultfinal);
  } catch (err) {
    console.log(err);
    res.status(404).send("Erreur serveur");
  }
};
