const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// to use route handlers, we export the routes as the body of a function,
// that is immidiately exported. This function is then ran through the index.js file.
module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.post("/api/email_auth", async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.send(existingUser);
    }
    const user = new User({
      name,
      email,
      password
    });
    try {
      await user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post("/api/email_authenticate", function(req, res) {
    const secret = keys.tokenKey;
    const { email, password } = req.body;
    User.findOne({ email }, function(err, user) {
      if (err) {
        console.error(err);
        res.status(500).json({
          error: "Internal error please try again"
        });
      } else if (!user) {
        res.status(401).json({
          error: "Incorrect email or password"
        });
      } else {
        user.isCorrectPassword(password, function(err, same) {
          if (err) {
            res.status(500).json({
              error: "Internal error please try again"
            });
          } else if (!same) {
            res.status(401).json({
              error: "Incorrect email or password"
            });
          } else {
            // Issue token
            const payload = { email };
            const token = jwt.sign(payload, secret, {
              expiresIn: "1h"
            });
            res.cookie("token", token, { httpOnly: true }).sendStatus(200);
          }
        });
      }
    });
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
