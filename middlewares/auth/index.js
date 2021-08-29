/**
 *   Middleware para comprobar si el token ha caducado o no
 **/

const jwt = require("jwt-simple");
const moment = require("moment");
const { SECRET_KEY_JWT } = require("./../../config");

/**
 * Middleware que verifica si elk token es valido para usar un endPonit
 * @param {*} req
 * @param {*} res
 * @param {*} next Callback
 * @returns
 */
const verificaToken = async (req, res, next) => {
  //let token = req.get('token');

  if (!req.headers.authorization) {
    res.status(403).send({
      status: "ERROR",
      message: "La peticion no tiene cabecera de Autenticaion.",
    });
  }

  const token = req.headers.authorization.replace(/['"']+/g, "");

  try {
    var payload = await jwt.decode(token, SECRET_KEY_JWT);

    if (payload.exp <= moment().unix()) {
      return res.status(404).send({
        status: "ERROR",
        message: "El token ha expirado",
      });
    }
  } catch (error) {
    //console.log(error);

    return res.status(404).send({
      status: "ERROR",
      message: "Token invalido.",
    });
  }

  req.user = payload;
  next();
};

module.exports = {
  verificaToken,
};
