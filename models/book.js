// Use unique validor to check for duplicate name.
// The trueName field trim leading and trailing white spaces and unify casing for validation.
var uniqueValidator = require("mongoose-unique-validator");
var mongoose = require("mongoose"),
  bookSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    trueName: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  });
bookSchema.plugin(uniqueValidator);

// Exports module
module.exports = mongoose.model("Book", bookSchema);
