var users = [
  {
    name: "abc",
    isKidneyHealthy: false,
  },
  {
    name: "bcd",
    isKidneyHealthy: true,
  },
];

const express = require("express");
const zod = require("zod");
const app = express();

const checkString = zod.array(zod.string);

app.use(express.json());

app.get("/", function (req, res) {
  res.json(users);
});

app.post("/", function (req, res) {
  const name = req.body.name;
  const response = checkString.safeParse(name);
  const user = {
    name,
    isKidneyHealthy: false,
  };
  users.push(user);
  res.send(response);
});

app.put("/", function (req, res) {
  const name = req.body.name;

  users.forEach((user) => {
    if (user.name == name) {
      user.isKidneyHealthy = req.body.status;
      res.redirect("/");
    }
  });

  res.status(404).json({
    msg: "Name not found!!",
  });
});

app.delete("/", function (req, res) {
  const name = req.body.name;

  users = users.filter((user) => user.name != name);
  res.redirect("/");
});

app.use(function (err, req, res, next) {
  res.json({
    message: "Sorry!! Error occurred!!",
  });
});

app.listen(3000);
