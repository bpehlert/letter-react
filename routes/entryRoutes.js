const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Entry = mongoose.model("entries"); //This is how you require in mongoose model classes

module.exports = app => {
  app.post("/api/entries", requireLogin, async (req, res) => {
    const { date, body, entryNumber } = req.body;

    const entry = new Entry({
      date,
      body,
      entryNumber,
      _user: req.user.id,
      dateCreated: Date.now(),
      lastEdited: Date.now()
    });

    try {
      await entry.save();
      req.user.entries += 1;
      const user = await req.user.save();

      res.send(body);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
