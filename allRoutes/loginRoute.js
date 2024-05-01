var express = require("express");
var router = express.Router();

var userData = [
  { username: "zubair@gmail.com", password: "123abc" },
  { username: "john@yahoo.com", password: "789xyz" },
];

function checkUserid(username, password) {
  const user = userData.find((user) => user.username === username);
  if (user) {
    if (user.password === password) {
      return { user, success: true };
    }
  }
  return { success: false };
}
//route handler
router.post("/", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const result = checkUserid(username, password);

  if (result.success) {
    req.session.isAuthenticated = true;
    req.session.user = result.user;
    res.redirect("/products");
    req.session.flash = {
      type: "Success",
      message: "Welcome back, " + result.user.username,
    };
  } else {
    req.session.flash = {
      type: "error",
      message: "Username or password is incorrect",
    };
    res.redirect("/login");
  }
});

router.get("/", function (req, res) {
  res.render("login", { title: "Login form" });
});

module.exports = router;
