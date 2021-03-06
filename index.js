const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const bodyParser = require("body-parser"); // allows body properties to be access on incoming requests.
// These require statements initialize the different models and connect them to Mongoose.
require("./models/User");
require("./models/Entry");
// This require statement initializes passport.
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in miliseconds
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

require("./routes/authRoutes")(app);
require("./routes/entryRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets like our main.js file, or main.css
  app.use(express.static("client/build"));

  // Express will serve up the index.html file if it doesn't recongize the route.
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Lisenting on port ${PORT}.`);
});
