const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  }, //User's name
  email: {
    type: String,
    require: true,
    unique: true,
  }, //Email must be unique
});
module.exports = mongoose.model("User", userSchema);
