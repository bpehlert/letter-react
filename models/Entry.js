const mongoose = require("mongoose");
const { Schema } = mongoose;

const entrySchema = new Schema({
  date: Date,
  body: Schema.Types.Mixed,
  entryNumber: Number,
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateCreated: Date,
  lastEdited: Date
});

mongoose.model("entries", entrySchema);
