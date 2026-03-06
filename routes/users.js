const express = require("express");
const User = require("../models/user.model");

const app = express();

app.use(express.json());

//Creat a new user
async function createUser(newUser) {
  try {
    if (!newUser.name || !newUser.email || !newUser.password) {
      console.log("Name, Email and Password are require.");
      return;
    }

    const existingUser = await User.findOne({ email: newUser.email });

    if (existingUser) {
      console.log("Error: User email already exist.");
      return;
    }
    const user = new User(newUser);
    const saveUser = await user.save();
    console.log("New user:", saveUser);
  } catch (error) {
    console.log("Error creating new user", error);
  }
}
module.exports = { createUser };