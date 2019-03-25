const mongoose = require("mongoose");
const { Schema } = mongoose;

const verificationSchema = new Schema({
  token: String,
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("verificationTokens", verificationSchema);
