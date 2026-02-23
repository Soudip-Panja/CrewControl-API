const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  }, //Tag names must be unique
});
module.exports = mongoose.model("Tag", tagSchema);
