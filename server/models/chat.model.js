const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChatSchema = new Schema({
  participants: {
    type: [Schema.Types.ObjectId],
  },
  messages: {
    type: [Schema.Types.ObjectId],
  },
  name: {
    type: String,
  },
});

const Chat = mongoose.model("chat", ChatSchema);

module.exports = Chat;
