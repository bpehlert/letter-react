const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Entry = mongoose.model("entries"); //This is how you require in mongoose mondel classes

module.exports = app => {
  app.post("/api/entries", requireLogin, (req, res) => {
    const { date, body, entryNumber, collaborators } = req.body;

    const entry = new Entry({
      date,
      body,
      entryNumber,
      collaborators: collaborators
        .split(",")
        .map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateCreated: Date.now(),
      lastEdited: Date.now()
    });
  });
};
