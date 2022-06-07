const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Chat = require("../models/chat.model");
const Message = require("../models/message.model");
const User = require("../models/user.model");

// enter chat room
router.put("/new_user", auth, async (req, res, next) => {
  const { chat, user } = req.body;
  try {
    // update chat participants array to include new user
    const thisChat = await Chat.findOne({ chat });
    const newUser = await User.findOne({ user });
    thisChat.participants.push(newUser);
    // render chat to user
    res.status(200).json(thisChat);
    // send message in chat 'user has entered the chat"
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error joining chat" });
  }
});

// get all of a users chats
router.get("/user/:id", auth, async (req, res, next) => {});

// get a chat & its messages
router.get("/:id", auth, async (req, res, next) => {});

// delete a chat
router.delete("/:id", auth, async (req, res, next) => {});

module.exports = router;
