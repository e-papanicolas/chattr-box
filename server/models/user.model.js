const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    // validator: (value) => {
    //   if (!validator.isEmail(value)) {
    //     throw new Error({ error: "username invalid" });
    //   }
    // },
  },
  password: {
    type: String,
    required: true,
    trim: true,
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
