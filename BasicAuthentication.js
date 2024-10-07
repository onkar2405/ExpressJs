const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "12345";

const app = express();

const ALL_USERS = [
  {
    username: "abc@gmail.com",
    password: "123",
    name: "Abc",
  },
  {
    username: "bcd@gmail.com",
    password: "1234",
    name: "Bcd",
  },
  {
    username: "cdf@gmail.com",
    password: "12345",
    name: "Cdf",
  },
];

app.use(express.json());

function userExists(username, password) {
  return ALL_USERS.some((user) => {
    if (user.username === username) {
      console.log("User found");
      return true; // this will stop the iteration once a match is found
    }
    return false;
  });
}

app.post("/sign-in", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User does not exist!!",
    });
  }
  var token = jwt.sign({ username, password }, jwtPassword);
  console.log(token);
  return res.json(token);
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  console.log("Token", req.headers.authorization);
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    if (userExists(username, jwtPassword)) {
      const filteredArray = ALL_USERS.filter(
        (user) => user.username != username
      );
      res.json({
        filteredArray,
      });
    }
    return res.status(403).json({
      msg: "User does not exists!!",
    });
  } catch (e) {
    throw new Error(e);
  }
});

app.listen(3000);
