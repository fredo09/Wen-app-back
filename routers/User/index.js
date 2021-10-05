/**
 *   Router User
 **/

const express = require("express");
const multiParty = require("connect-multiparty");
const {
  signUp,
  signIn,
  getUsers,
  getUsersActived,
  uploadAvatar,
  getAvatar,
  updateUser,
  activateUser,
  deleteUser,
  createUser,
} = require("../../controllers/User");
const { verificaToken } = require("./../../middlewares/auth");

//donde se van a subir las imagenes
const uploadAvatarM = multiParty({ uploadDir: "./uploads/Avatar" });

const api = express();

//Paths EndPoints
api.post("/signUp", signUp);
api.post("/signIn", signIn);
api.get("/users", [verificaToken], getUsers);
api.get("/users-actived", [verificaToken], getUsersActived);
api.put("/updateAvatar/:id", [verificaToken, uploadAvatarM], uploadAvatar);
api.get("/get-avatar/:avatarName", getAvatar);
api.put("/updateUser/:id", [verificaToken], updateUser);
api.put("/activate-User/:id", [verificaToken], activateUser);
api.delete("/delete-user/:id", [verificaToken], deleteUser);
api.post("/create-user", [verificaToken], createUser);

module.exports = api;
