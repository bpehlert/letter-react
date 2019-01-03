const mongoose = require("mongoose");
const { Schema } = mongoose; // destructured from const Schema = mongoose.Schema

const testSchema = new Schema({
  googleId: String
});

mongoose.model("test", testSchema);
// Another