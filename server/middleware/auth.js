const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    data = jwt.verify(token, process.env.JWT_KEY);

    User.findOne({ token_id: data.userId })
      .then((user) => {
        if (!user) {
          res.status(401).json({ message: "Authentication failed" });
        }
        next();
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
