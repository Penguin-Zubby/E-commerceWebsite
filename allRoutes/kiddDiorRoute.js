var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  res.render("kiddDior");
});

module.exports = router;
