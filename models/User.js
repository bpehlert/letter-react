const mongoose = require('mongoose');
const { Schema } = mongoose; // const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String

});

mongoose.model('users', userSchema);

// To execute this file, it needs to be required someone in the server app. 