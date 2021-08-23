/**
 *   Configuracion Server
 **/

const API_VERSION = "v1";
const PORT = process.env.PORT || 3977;
const PORTDB = 27017;

//Secret Key JWT
const SECRET_KEY_JWT = "SEED DE DESAROLLO";

module.exports = {
  API_VERSION,
  PORT,
  PORTDB,
  SECRET_KEY_JWT,
};
