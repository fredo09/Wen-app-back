/**
 * Modelo de Post
 */

const mongoose = require("mongoose");
const mongoose_paginate = require("mongoose-paginate");

const { Schema } = mongoose;

//Creamos Schema Post
const PostSchema = new Schema({
  title: String,
  url: {
    type: String,
    unique: true,
  },
  description: String,
  date: Date,
});

//Usamos Mongoose-Paginate
PostSchema.plugin(mongoose_paginate);

module.exports = mongoose.model("Posts", PostSchema);
