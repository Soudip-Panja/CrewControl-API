const { initializeDatabase } = require("./db/db.connect");
initializeDatabase();

const { seedUser } = require("./seedData/usersSeeding");
// seedUser();

const express = require("express");
require("dotenv").config();
const cors = require("cors");

const authRoute = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", authRoute);


const { createUser } = require("./routes/users");

const newUser = {
  name: "Radha Panja",
  email: "radha03pan@gmail.com",
  password: "radha123",
};

createUser(newUser);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
