/**
 *   Controller para Autenticacion de usuarios
 **/

const { decodecToken, CreatJwtToken } = require("./../../services/jwt");
const moment = require("moment");
const User = require("./../../models/User");

/**
 * Funcion que revisa si el token ha expirado
 * @param {*} token_
 * @returns
 */
const willExpireToken = (token_) => {
  const { exp } = decodecToken(token_);

  const currentDate = moment().unix();

  const isExpired = currentDate > exp ? true : false;

  return isExpired;
};

/**
 * Funcion que actualiza o refresca el token
 * @param {*} req
 * @param {*} res
 */
const refresActualyToken = (req, res) => {
  const { refresToken } = req.body;

  const isRefresToken_ = willExpireToken(refresToken);

  if (isRefresToken_) {
    res.status(404).send({
      status: "ERROR",
      message: "El token refrescado ha expirado.",
    });
  } else {
    const { id } = decodecToken(refresToken);

    User.findOne({ _id: id }, (error, UserStored) => {
      if (error) {
        res.status(500).send({
          status: "ERROR",
          message: "Error en el servidor.",
        });
      } else {
        if (!UserStored) {
          res.status(404).send({
            status: "ERROR",
            message: "Usuario no encontrado.",
          });
        } else {
          // encontramos el usuario y refrescamos el token
          res.status(200).send({
            status: "OK",
            message: "Se ha refrescado el token",
            token: CreatJwtToken(UserStored),
            refresToken: refresToken,
          });
        }
      }
    });
  }
};

module.exports = {
  refresActualyToken,
};
