/**
 *   Router User
 **/

const express = require("express");
const {
  signUp,
  signIn,
  getUsers,
  getUsersActived,
} = require("../../controllers/User");
const { verificaToken } = require("./../../middlewares/auth");

const api = express();

//Paths EndPoints
api.post("/signUp", signUp);
api.post("/signIn", signIn);
api.get("/users", [verificaToken], getUsers);
api.get("/users-actived", [verificaToken], getUsersActived);

module.exports = api;
