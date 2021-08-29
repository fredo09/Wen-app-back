/**
 *   Routes Global
 **/

// Configuracion de express
const express = require("express");
const api = express();

//Rutas
const UsersPath = require("./User");
const AuthPath = require("./Auth");

//Usando las rutas
api.use(UsersPath);
api.use(AuthPath);

module.exports = api;
