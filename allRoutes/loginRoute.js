const express = require("express");
const router = express.Router();

const userData = [
  { username: "zubair", password: "123abc" },
  { username: "john", password: "789xyz" },
];

function checkUserid(username, password) {
  if (userData.find((user) => user.username === username)) {
    if (userData.find((user) => user.password === password)) {
      return true;
    }
  }
}
router.post("/", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (chechUserid(username, password)) {
    req.sessipon.isAuthenticated = true;
    res.redirect("/userHome");
  } else {
    req.session.flash = {
      type: "error",
      message: "Username or password is incorrect",
    };
    res.redirect("/login");
  }
});

router.get("/", function (req, res) {
  let userMessageType = null;
  let userMessage = null;

  if (req.session.flash) {
    userMessageType = req.session.flash.type;
    userMessage = req.session.flash.message;
    req.session.flash = "";
  }
  res.render("login", { title: "Login", userMessageType, userMessage });
});

module.exports = router;
