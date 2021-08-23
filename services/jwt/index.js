/**
 *   Trabajamos en el token de autenticacion
 **/

const jwtSimple = require("jwt-simple");
const moment = require("moment");
const { SECRET_KEY_JWT } = require("./../../config");

/**
 * crea el token de logueo
 * @param {Object} user
 * @returns token
 */
const CreatJwtToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    createAtToken: moment().unix(),
    exp: moment().add(3, "hours").unix(),
  };

  return jwtSimple.encode(payload, SECRET_KEY_JWT);
};

/**
 * Refresca el Token del usuario que se autentico
 * @param {Object} user
 */
const refreshToken = (user) => {
  const payload = {
    id: user.id,
    exp: moment().add(30, "days").unix(),
  };

  return jwtSimple.encode(payload, SECRET_KEY_JWT);
};

const decodecToken = (token) => jwtSimple.decode(token, SECRET_KEY_JWT, true);

module.exports = {
  CreatJwtToken,
  refreshToken,
  decodecToken,
};
