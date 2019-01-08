const mongoose = require("mongoose");
const { Schema } = mongoose; // destructured from const Schema = mongoose.Schema

const userSchema = new Schema({
  googleId: String,
  entries: { type: Number, default: 0 }
});

mongoose.model("users", userSchema);
