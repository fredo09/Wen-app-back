/**
 *  Rutas para auttenticacion
 *
 **/

const express = require("express");
const { refresActualyToken } = require("./../../controllers/auth");

const api = express();

api.post("/refress-token", refresActualyToken);

module.exports = api;
