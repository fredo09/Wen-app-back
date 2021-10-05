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
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

//Configuracion HTTP
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Router Basico
app.use(`/api/${API_VERSION}`, routes);

module.exports = app;
