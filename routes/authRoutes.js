const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");

// to use route handlers, we export the routes as the body of a function,
// that is immidiately exported. This function is then ran through the index.js file.
module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
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

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
