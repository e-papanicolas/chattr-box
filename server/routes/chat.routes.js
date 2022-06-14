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
    await Chat.updateOne(
      {},
      { participants: [...thisChat.participants, newUser] }
    );
    // render chat to user
    res.status(200).json(thisChat);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error joining chat" });
  }
  // TODO: send message in chat 'user has entered the chat"
});

// leave chat
router.put("/:id/leave", auth, async (req, res, next) => {
  const { id } = req.params;
  const { user } = req.body;
  console.log("user", user);
  try {
    const chat = await Chat.findOne({ id });
    const parts = chat.participants.filter((par) => {
      console.log("par", par);
      return par !== user;
    });
    await Chat.updateOne({}, { participants: parts });
    res.status(200).json(chat);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "error leaving chat" });
  }
});

// send a new message
router.post("/:id/new_msg", auth, async (req, res, next) => {
  const { id } = req.params;
  const { user, content } = req.body;
  console.log(id, user, content);
  try {
    const chat = await Chat.findOne({ id });
    const message = new Message({ user: user, content: content, chat_id: id });
    await message.save();
    await Chat.updateOne({}, { messages: [...chat.messages, message] });
    chat.messages.push(message._id);
    res.status(200).json(chat);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "error sending new message" });
  }
});

// get all of a users chats
router.get("/user/:id", auth, async (req, res, next) => {});

// get a chat & its messages
router.get("/:id", auth, async (req, res, next) => {
  console.log(req.params);
  const { id } = req.params;
  try {
    const chat = await Chat.findOne({ id });
    res.status(200).json(chat);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error getting chat" });
  }
});

// delete a chat
router.delete("/:id", auth, async (req, res, next) => {});

module.exports = router;
