/**
 *   Controllers User
 **/

const User = require("../../models/User");
const byCrypt = require("bcrypt-nodejs");
const fs = require("fs");
const path = require("path");
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

const getAvatar = (req, res) => {
  const avatarName = req.params.avatarName;
  const filePath = "./uploads/Avatar/" + avatarName;

  //Verifica si hay imagen del avatar
  fs.exists(filePath, (exists) => {
    if (!exists) {
      res.status(404).send({
        status: "OK",
        message: "El avatar no existe",
      });
    } else {
      res.sendFile(path.resolve(filePath));
    }
  });
};

const uploadAvatar = (req, res) => {
  let params = req.params;

  User.findOne({ _id: params.id }, (err, userData) => {
    if (err) {
      res.status(500).send({
        status: "ERROR",
        message: "Error de servidor",
      });
    } else {
      if (!userData) {
        res.status(404).send({
          status: "ERROR",
          message: "Usuario no encontrado",
        });
      } else {
        let user = userData;

        // recuperamos la imagen
        if (req.files) {
          let filePath = req.files.avatar.path;
          let fileSplit = filePath.split("/");

          let fileName = fileSplit[2];
          let extFile = fileName.split(".");
          let fileExt = extFile[1];

          if (fileExt !== "png" && fileExt !== "jpg" && fileExt !== "gif") {
            res.status(400).send({
              status: "ERROR",
              message:
                "El tipo de imagen no es permitida. (Extenciones permitidas: .png, .jpg y .gif )",
            });
          } else {
            //Guardamos el avatar y actualizamos avatar
            user.avatar = fileName;

            User.findByIdAndUpdate(
              { _id: params.id },
              user,
              (err, userResult) => {
                if (err) {
                  res.status(500).send({
                    status: "ERROR",
                    message: "Error del servidor",
                  });
                } else {
                  if (!userResult) {
                    res.status(404).send({
                      status: "ERROR",
                      message: "No se ha encontrado ningun usuario",
                    });
                  } else {
                    res.status(200).send({
                      status: "OK",
                      message: "Avatar actualizado",
                      avatar: fileName,
                    });
                  }
                }
              }
            );
          }
        }
      }
    }
  });
};

const updateUser = (req, res) => {
  let body = req.body;
  let params = req.params;

  User.findOneAndUpdate({ _id: params.id }, body, (err, userUpdate) => {
    if (err) {
      res.status(500).send({
        status: "ERROR",
        message: "Error del servidor",
      });
    } else {
      if (!userUpdate) {
        res.status(404).send({
          status: "ERROR",
          message: "No se ha encontrado ningun usuario.",
        });
      } else {
        res.status(200).send({
          status: "OK",
          message: "Usuario Actualizado.",
        });
      }
    }
  });
};

module.exports = {
  signUp,
  signIn,
  getUsers,
  getUsersActived,
  getAvatar,
  uploadAvatar,
  updateUser,
};
