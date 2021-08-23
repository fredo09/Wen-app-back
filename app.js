/**
 *   CONEXION PARA MONGO Y API
 **/

const express = require("express");
const bodyParser = require("body-parser");
const { API_VERSION } = require("./config");

const app = express();

//Routers
const routes = require("./routers");

//Middlewares BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configuracion HTTP

//Router Basico
app.use(`/api/${API_VERSION}`, routes);

module.exports = app;
