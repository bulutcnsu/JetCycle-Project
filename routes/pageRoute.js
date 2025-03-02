const express = require("express");
const router = express.Router();


router.route("/").get((req, res) => {
  res.render("index");
});

router.route("/about").get((req, res) => {
  res.render("about");
});


router.route("/login").get((req, res) => {
  res.render("login");
});

router.route("/register").get((req, res) => {
  res.render("register");
});


router.route("/contact").get((req, res) => {
  res.render("contact");
});



module.exports = router;
