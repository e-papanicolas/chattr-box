const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    try {
      const token = authHeader.split(" ")[1];
      data = jwt.verify(token, process.env.JWT_KEY);
      console.log(data);
      req.body.user = data.user._id;
      console.log(req.body);
      next();
    } catch (e) {
      res.status(500).send({ message: "Invalid Token" });
    }
  } else {
    return res.status(401).json({ message: "Authentication missing" });
  }
};

module.exports = auth;
