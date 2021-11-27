/**
 *   Controllers Menu
 **/

const Menu = require("./../../models/menu");

const test = (req, res) => {
  console.log("Linkeado Menu api");
};

const addMenu = (req, res) => {
  const { title, url, order, active } = req.body;

  const menu = new Menu();

  menu.title = title;
  menu.url = url;
  menu.order = order;
  menu.active = active;

  menu.save((err, createMenu) => {
    if (err) {
      res.status(500).send({
        status: "ERROR",
        message: "Error del servidor.",
      });
    } else {
      if (!createMenu) {
        res.status(404).send({
          status: "ERROR",
          message: "Error al crear el menu.",
        });
      } else {
        res.status(201).send({
          status: "OK",
          message: "Menu Creado Correctamente!",
        });
      }
    }
  });
};

const getMenus = (req, res) => {
  Menu.find()
    .sort({
      order: "asc",
    })
    .exec((err, menuStored) => {
      if (err) {
        res.status(500).send({
          status: "ERROR",
          message: "Error en el servido.",
        });
      } else {
        if (!menuStored) {
          res.status(404).send({
            status: "ERROR",
            message: "No se ha encontrado ningun registro de menu",
          });
        } else {
          res.status(200).send({
            status: "OK",
            menus: menuStored,
          });
        }
      }
    });
};

const updateMenu = (req, res) => {
  let menuData = req.body;
  const params = req.params;

  Menu.findByIdAndUpdate(params.id, menuData, (err, menuUpdate) => {
    if (err) {
      res.status(500).send({
        status: "ERROR",
        message: "Error en el servido.",
      });
    } else {
      if (!menuUpdate) {
        res.status(404).send({
          status: "ERROR",
          message: "No se ha encontrado ningun menu",
        });
      } else {
        res.status(201).send({
          status: "OK",
          message: "Menu actualizado Correctamente.",
        });
      }
    }
  });
};

const activeMenu = (req, res) => {
  const { id } = req.params;
  const { active } = req.body;

  Menu.findByIdAndUpdate(id, { active }, (err, menuStored) => {
    if (err) {
      res.status(500).send({
        status: "ERROR",
        message: "Error del servidor.",
      });
    } else {
      if (!menuStored) {
        res.status(404).send({
          status: "ERROR",
          message: "No se ha encontrado el Menu.",
        });
      } else {
        active
          ? res
              .status(200)
              .send({ status: "OK", message: "Menu se ha activado" })
          : res
              .status(200)
              .send({ status: "OK", message: "Menu se ha desactivado" });
      }
    }
  });
};

module.exports = {
  test,
  addMenu,
  getMenus,
  updateMenu,
  activeMenu,
};
