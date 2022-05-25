const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/user.model");

// sign up - create new user
router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username: username });
    if (user) return res.status(400).json({ message: "username is taken" });

    user = new User({
      username,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        _id: user._id,
      },
    };

    jwt.sign(payload, process.env.JWT_KEY, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token: token, data: user });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error creating user" });
  }
});

// login
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid username" });

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) return res.status(401).json({ message: "Invalid password" });

    const payload = {
      user: {
        _id: user._id,
      },
    };

    jwt.sign(payload, process.env.JWT_KEY, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token: token, data: user });
    });
  } catch (e) {
    console.error(e);
    return res.status(401).json({ message: "Authentication failed", error: e });
  }
});

// logout
router.get("/:_id/logout", (req, res, next) => {});

// get / show user
router.get("/me", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.body.user);
    res.json(user);
  } catch (e) {
    res.send({ message: "error fetching user" });
  }
});

// update user
router.put("/:_id", (req, res, next) => {});

module.exports = router;
