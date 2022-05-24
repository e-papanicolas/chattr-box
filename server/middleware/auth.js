const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const auth = (req, res, next) => {
  console.log("in auth");
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    data = jwt.verify(token, process.env.JWT_KEY);
    console.log(data);

    User.findOne({ _id: data.userId })
      .then((user) => {
        if (!user) {
          res.status(401).json({ message: "Authentication failed" });
        }
        console.log(user);
        next(user);
      })
      .catch((error) => {
        return res
          .status(401)
          .json({ message: "Authentication failed", error: error });
      });
  } else {
    return res.status(401).json({ message: "Authentication missing" });
  }
};

module.exports = auth;
