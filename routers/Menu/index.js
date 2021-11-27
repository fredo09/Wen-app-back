/**
 *   Router Menu
 **/

const express = require("express");

const {
  test,
  addMenu,
  getMenus,
  updateMenu,
  activeMenu,
  deleteMenu,
} = require("./../../controllers/Menu");

const { verificaToken } = require("./../../middlewares/auth");

const api = express();

//EndPoinst
api.get("/test", [verificaToken], test);
api.post("/add-menu", [verificaToken], addMenu);
api.get("/get-menus", getMenus);
api.put("/update-menu/:id", [verificaToken], updateMenu);
api.put("/active-menu/:id", [verificaToken], activeMenu);
api.delete("/delete-menu/:id", [verificaToken], deleteMenu);

module.exports = api;
