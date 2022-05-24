const express = require("express");
const app = express();
require("dotenv").config();
const port = 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const MONGODB_URI = process.env.MONGODB_URI;
const mongoose = require("mongoose");
const errors = require("./utils/errorHandler");
const usersRouter = require("./routes/user_routes");

// middleware for parsing requests
app.use(cors());
app.use(bodyParser.json());

// middleware for routes and errors
app.use("/users", usersRouter);
app.use(errors.errorHandler);

// mongoDB connection
mongoose.connect(MONGODB_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log(`Connected to mongoDB at ${MONGODB_URI}`));

app.listen(port, () => {
  console.log("Server running on port: " + port);
});