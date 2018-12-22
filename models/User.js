const mongoose = require("mongoose");
const { Schema } = mongoose; // destructured from const Schema = mongoose.Schema

const userSchema = new Schema({
  googleId: String
});

mongoose.model("users", userSchema);
