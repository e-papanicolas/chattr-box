const mongoose = require("mongoose");
const { Schema } = mongoose;

const MessageSchema = new Schema({
  user: {
    type: Schema.Types.Object,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model("message", MessageSchema);

module.exports = Message;
