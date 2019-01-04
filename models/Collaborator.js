const mongoose = require("mongoose");
const { Schema } = mongoose;

const collaboratorSchema = new Schema({
  userEmail: String,
  hasContributed: { type: Boolean, default: false }
});

module.exports = collaboratorSchema;
