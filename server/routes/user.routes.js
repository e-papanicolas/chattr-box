const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/user.model");

// sign up - create new user
router.post("/register", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      username: req.body.username,
      password: hash,
    });
    user
      .save()
      .then((response) => {
        res
          .status(201)
          .json({ message: "User successfully created", result: response });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  });
});

// login
router.post("/login", (req, res, next) => {
  let getUser;
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Authentication failed" });
      }
      getUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((response) => {
      if (!response) {
        return res.status(401).json({ message: "Authentication failed" });
      }
      let jwtToken = jwt.sign(
        {
          secretusername: getUser.username,
          userId: getUser._id,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token: jwtToken, expiresIn: 3600, data: getUser });
    })
    .catch((error) => {
      return res
        .status(401)
        .json({ message: "Authentication failed", error: error });
    });
});

// logout
router.get("/:_id/logout", (req, res, next) => {});

// get / show user
router.get("/:_id", auth, (req, res, next) => {
  console.log(req.params);
  User.findById(req.params._id, (error, data) => {
    console.log(data);
    if (error) return next(error);
    else res.status(200).json({ result: data });
  });
});

// update user
router.put("/:_id", (req, res, next) => {});

module.exports = router;
