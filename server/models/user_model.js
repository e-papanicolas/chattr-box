const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: () => new Date(),
  },
});

UserSchema.statics = {
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new Error("No such user exists!");
        return err;
      });
  },
};
const User = mongoose.model("user", UserSchema);

module.exports = User;
