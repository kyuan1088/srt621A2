const mongoose = require("mongoose"),
  bookSchema = mongoose.Schema({
    name: String,
    author: String,
    link: String,
    id: Number,
  });
module.exports = mongoose.model("Book", bookSchema);
