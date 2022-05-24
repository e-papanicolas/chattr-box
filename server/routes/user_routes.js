const express = require("express");
const router = express.Router();
const User = require("../models/user");

// sign up - create new user
router.post("/register", (req, res, next) => {
  const user = new User(req.body);
  user.save();
  res.json(user);
});

// login
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (user.password === password) {
      res.json(user);
    } else {
      res.status(401).send("Incorrect password");
    }
  });
});

// logout
router.get("/:id/logout", (req, res, next) => {});

// get / show user
router.get("/:id", (req, res, next) => {
  User.get(req.params.id).then((user) => res.json(user));
});

// update user
router.put("/:id", (req, res, next) => {});

module.exports = router;
