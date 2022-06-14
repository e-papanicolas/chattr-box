const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
require("dotenv").config();
const port = 7654;
const socketPort = 7655;
const cors = require("cors");
const bodyParser = require("body-parser");
const MONGODB_URI = process.env.MONGODB_URI;
const mongoose = require("mongoose");
const errors = require("./errorHandler");
const usersRouter = require("./routes/user.routes");
const chatRouter = require("./routes/chat.routes");
const User = require("./models/user.model");

// middleware for parsing requests
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// middleware for routes and errors
app.use("/users", usersRouter);
app.use("/chat", chatRouter);
// app.use(errors.errorHandler);

// mongoDB connection
mongoose.connect(MONGODB_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log(`Connected to mongoDB at ${MONGODB_URI}`));

//express server
app.listen(port, () => {
  console.log("Server listening on port: " + port);
});

// socket server
io.on("connection", async (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

server.listen(socketPort, () => {
  console.log("Socket server listening on port: " + socketPort);
});
