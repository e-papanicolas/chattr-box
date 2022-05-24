const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/user.model");

// sign up - create new user
router.post("/register", (req, res, next) => {
  console.log(req.body);
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      username: req.body.username,
      password: hash,
    });
    user
      .save()
      .then((res) => {
        res
          .status(201)
          .json({ message: "User successfully created", result: res });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  });

  // const user = new User(req.body);
  // user.save();
  // res.json(user);
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
    .then((res) => {
      if (!res) {
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

  // const { email, password } = req.body;
  // User.findOne({ email: email }).then((user) => {
  //   if (user.password === password) {
  //     res.json(user);
  //   } else {
  //     res.status(401).send("Incorrect password");
  //   }
  // });
});

// logout
router.get("/:id/logout", (req, res, next) => {});

// get / show user
router.get("/:id", auth, (req, res, next) => {
  User.findById(req.params.id, (error, data) => {
    if (error) return next(error);
    else res.status(200).json({ result: data });
  });
});

// update user
router.put("/:id", (req, res, next) => {});

module.exports = router;
