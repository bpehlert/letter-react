const express = require('express'); //Node isn't campatible with ES6 module syntax
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys')
require('./models/User'); //Executes the code found in User.js file
require('./services/passport'); //Executes the code found in the passport.js file
const authRoutes = require('./routes/authRoutes')


mongoose.connect(keys.mongoURI);

// Creates a new express app
const app = express();

// Make use of cookies within our application
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());


// Creates the route handlers
authRoutes(app);

// defines the server port Heroku dynamically or 5000 for local
const PORT = process.env.PORT || 5000;
app.listen(PORT);



