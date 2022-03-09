/**
 * Paths Post
 **/

const express = require("express");

const {
  addPost,
  getPost,
  updatePost,
  deletePost,
  obtenerPost,
} = require("./../../controllers/Post");

const { verificaToken } = require("./../../middlewares/auth");

const api = express();

//EndPoins
api.post("/addPost", [verificaToken], addPost);
api.get("/obtenerPosts", getPost);
api.put("/updatePost/:id", [verificaToken], updatePost);
api.delete("/deletePost/:id", [verificaToken], deletePost);
api.get("/obtenerPost/:url", obtenerPost);

module.exports = api;
