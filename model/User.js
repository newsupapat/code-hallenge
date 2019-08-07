const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: String,
  Email: String,
  role: {
    type: String,
    default: "Normal",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
