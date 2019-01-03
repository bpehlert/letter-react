const mongoose = require("mongoose");
const { Schema } = mongoose;

const entrySchema = new Schema({
  date: Date,
  body: String,
  entryNumber: Number
});

mongoose.model("entries", entrySchema);

// Test push to git