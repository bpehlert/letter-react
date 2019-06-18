const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Entry = mongoose.model("entries"); //This is how you require in mongoose model classes

module.exports = app => {
  app.post("/api/entries", requireLogin, async (req, res) => {
    const { date, body } = req.body;

    const entry = new Entry({
      date,
      body,
      _user: req.user.id,
      dateCreated: Date.now(),
      lastEdited: Date.now()
    });

    try {
      await entry.save();
      req.user.entries += 1;
      const user = await req.user.save();

      res.send(entry);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.put("/api/entries", requireLogin, async (req, res) => {
    Entry.findByIdAndUpdate(
      req.body.id,
      req.body,
      { new: true },
      (err, entry) => {
        if (err) return res.status(422).send(err);
        return res.send(entry);
      }
    );
  });

  app.get("/api/get_entries", requireLogin, async (req, res) => {
    try {
      const entries = await Entry.find({
        _user: req.user._id
      });
      res.send(entries);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
