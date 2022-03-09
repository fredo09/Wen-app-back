/**
 * Paths Post
 **/

const express = require("express");

const { addPost } = require("./../../controllers/Post");

const { verificaToken } = require("./../../middlewares/auth");

const api = express();

//EndPoins
api.post("/addPost", [verificaToken], addPost);

module.exports = api;
