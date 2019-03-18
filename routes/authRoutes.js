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

  app.post(
    "/api/email_authenticate",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/log-in",
      failureFlash: true
    })
  );

  app.post("/api/email_signup", async (req, res) => {
    const { name, username, password } = req.body;
    const existingUser = await User.findOne({ email: username });
    if (existingUser) {
      return res.send(existingUser, { message: "User already exists" });
    }
    const user = new User({
      name,
      email: username,
      password
    });
    try {
      await user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
