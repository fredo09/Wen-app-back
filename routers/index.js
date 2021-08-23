/**
 *   Routes Global
 **/

// Configuracion de express
const express = require("express");
const api = express();

//Rutas
const UsersPath = require("./User");

//Usando las rutas
api.use(UsersPath);

module.exports = api;
