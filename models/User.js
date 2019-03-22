const mongoose = require("mongoose");
const { Schema } = mongoose; // destructured from const Schema = mongoose.Schema
const bcrypt = require("bcrypt");

const saltRounds = 10;

const userSchema = new Schema({
  googleId: String,
  name: {
    firstName: String,
    lastName: String
  },
  email: String,
  password: String,
  photoURL: String,
  entries: { type: Number, default: 0 }
});

userSchema.pre("save", function(next) {
  // Check if no password is provided; i.e., new Google user
  if (!this.password) next();
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified("password")) {
    // Saving reference to this because of changing scopes
    const document = this;
    bcrypt.hash(document.password, saltRounds, function(err, hashedPassword) {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

userSchema.methods.validatePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(err, isMatch);
  });
};

mongoose.model("users", userSchema);
