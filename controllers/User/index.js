/**
 *   Controllers User
 **/

const User = require("../../models/User");
const byCrypt = require("bcrypt-nodejs");
const { CreatJwtToken, refreshToken } = require("./../../services/jwt");

const signUp = (req, res) => {
  const user = new User();

  const { email, password, repeatPassword, name, lastname } = req.body;

  user.email = email.toLowerCase();
  user.active = false;
  user.name = name;
  user.lastName = lastname;

  if (!password || !repeatPassword) {
    res
      .status(404)
      .send({ status: "ERROR", message: "Las contraseñas son obligatorias" });
  } else {
    if (password !== repeatPassword) {
      res
        .status(404)
        .send({ status: "ERROR", message: "Las contraseñas no son iguales" });
    } else {
      byCrypt.hash(password, null, null, function (err, hash) {
        if (err) {
          res
            .status(500)
            .send({ status: "ERROR", message: "Error al encriptar password" });
        }

        user.password = hash;

        user.save((err, userStored) => {
          if (err) {
            res
              .status(500)
              .send({ status: "ERROR", message: "El usuario ya existe." });
          } else {
            if (!userStored) {
              res.status(404).send({
                status: "ERROR",
                message: "Error al crear el usuario.",
              });
            } else {
              res.status(200).send({
                status: "OK",
                message: "¡Usuario Creado!",
                user: userStored,
              });
            }
          }
        });
      });
    }
  }
};

const signIn = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email.toLowerCase() }, (err, userStored) => {
    if (err) {
      res.status(500).send({
        status: "ERROR",
        message: "Error del servidor",
      });
    } else {
      if (!userStored) {
        res.status(404).send({
          status: "ERROR",
          message: "Usuario no encontrado",
        });
      } else {
        //comparamos la contraseña
        byCrypt.compare(password, userStored.password, (error, check) => {
          if (error) {
            res.status(500).send({
              status: "ERROR",
              message: "Error de servidor",
            });
          } else if (!check) {
            res.status(404).send({
              status: "ERROR",
              message: "Usuario o contraseña Incorrecta.",
            });
          } else {
            if (!userStored.actived) {
              res.status(200).send({
                status: "OK",
                message: "El usuario no esta activado",
              });
            } else {
              // regresamos el token
              res.status(200).send({
                status: "OK",
                token: CreatJwtToken(userStored),
                refresToken: refreshToken(userStored),
              });
            }
          }
        });
      }
    }
  });
};

const getUsers = async (req, res) => {
  const listUsers = await User.find();

  if (!listUsers) {
    res.status(404).send({
      status: "ERROR",
      message: "No se ha encontrado ningun usuario.",
    });
  } else {
    res.status(200).send({
      status: "OK",
      message: "Usuarios encontrados",
      usuarios: listUsers,
    });
  }
};

const getUsersActived = async (req, res) => {
  let query = req.query;

  const listUserActived = await User.find({ actived: query.active });

  if (!listUserActived) {
    res.status(404).send({
      status: "ERROR",
      message: "No se ha encontrado ningun usuario",
    });
  } else {
    res.status(201).send({
      status: "OK",
      message: "Usuarios encontrados",
      usuariosAcvtive: listUserActived,
    });
  }
};

module.exports = {
  signUp,
  signIn,
  getUsers,
  getUsersActived,
};
