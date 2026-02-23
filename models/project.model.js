const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  }, //Project name must be unique
  description: {
    type: String,
  }, //Optional field for project description
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Project', projectSchema);
