const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "123456";

mongoose.connect(
  "mongodb+srv://onkar:onkar@cluster0.dgxmi.mongodb.net/userAppNew?authMechanism=DEFAULT"
);

const User = mongoose.model("users", {
  name: String,
  username: String,
  pasword: String,
});

const app = express();
app.use(express.json());

app.post("/signin", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  console.log("username", req.body);

  const existingUser = await User.findOne({ username: username });
  console.log(existingUser);

  if (existingUser) {
    return res.status(400).json({
      msg: "User already exists in memory db",
    });
  }

  const user = new User({
    name: name,
    username: username,
    password: password,
  });

  user.save();

  res.status(200).json({ msg: "Success!!" });
});

app.get("/users", async function (req, res) {
  const token = req.headers.username;
  try {
    const username = await User.find({ username: token });

    console.log(username);
    res.send(username);
  } catch (e) {
    throw new Error(e);
  }
});

app.listen(3000);
