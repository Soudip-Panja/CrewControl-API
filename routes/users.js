const express = require("express");
const User = require("../models/user.model");

const router = express.Router();

//Creat a new user
async function createUser(newUser) {
  try {
    if (!newUser.name || !newUser.email || !newUser.password) {
      return { error: "Name, Email and Password are require." };
    }
    const existingUser = await User.findOne({ email: newUser.email });
    if (existingUser) {
      return { error: "Error: User email already exist." };
    }
    const user = new User(newUser);
    const saveUser = await user.save();
    return saveUser;
  } catch (error) {
    console.log("Error creating new user", error);
    return { error: "Database error" };
  }
}

router.post("/v1/create/user", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    if (newUser.error) {
      return res.status(400).json({ error: newUser.error });
    }
    res.status(201).json({
      message: "New user added successfully.",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error occured while creating New User!",
    });
  }
});

module.exports = router;
