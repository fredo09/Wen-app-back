/**
 *   Router User
 **/

const express = require("express");
const { signUp, signIn, getUsers } = require("../../controllers/User");
const { verificaToken } = require("./../../middlewares/auth");

const api = express();

//Paths EndPoints
api.post("/signUp", signUp);
api.post("/signIn", signIn);
api.get("/users", [verificaToken], getUsers);

module.exports = api;
