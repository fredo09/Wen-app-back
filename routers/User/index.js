/**
 *   Router User
 **/

const express = require("express");
const { signUp, signIn } = require("../../controllers/User");

const api = express();

api.post("/signUp", signUp);
api.post("/signIn", signIn);

module.exports = api;
