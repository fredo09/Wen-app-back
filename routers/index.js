/**
 *   Routes Global
 **/

// Configuracion de express
const express = require("express");
const api = express();

//Rutas
const UsersPath = require("./User");
const AuthPath = require("./Auth");
const MenuPath = require("./Menu");
const PostPath = require("./Post");

//Usando las rutas
api.use(UsersPath);
api.use(AuthPath);
api.use(MenuPath);
api.use(PostPath);

module.exports = api;
