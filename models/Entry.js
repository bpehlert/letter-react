const mongoose = require("mongoose");
const { Schema } = mongoose;
const collaboratorSchema = require("./Collaborator");

const entrySchema = new Schema({
  date: Date,
  body: String,
  entryNumber: Number,
  collaborators: [collaboratorSchema],
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateCreated: Date,
  lastEdited: Date
});

mongoose.model("entries", entrySchema);
