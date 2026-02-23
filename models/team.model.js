const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  }, // Team name must be unique
  description: {
    type: String,
  }, //Optional description for the team
});

module.exports = mongoose.model("Team", teamSchema);
