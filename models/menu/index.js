/**
 *   Modelo del nuevo menu-web
 **/

const mongoose = require("mongoose");
const { Schema } = mongoose;

const MenuSchema = new Schema({
  title: String,
  url: String,
  order: Number,
  active: Boolean,
});

module.exports = mongoose.model("Menus", MenuSchema);
