const bcrypt = require("bcrypt");
const User = require("../models/User");
const Blog = require("../models/Blog");
const { default: mongoose } = require("mongoose");
const usersRouter = require("express").Router();

usersRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id.trim();
    if (id.length !== 24) {
      res.status(400).send({
        error: `${id} must be a 24 hex characters string.`,
      });
      return;
    }

    const user = (await User.findById(id).exec()).toJSON();
    if (!user) {
      res.status(404).send({
        error: "not found",
      });
      return;
    }

    // Join query
    Blog.find()
      .where("_id")
      .in(user.blogs)
      .exec((err, records) => {
        user.blogs = records;
        res.status(200).json(user);
      });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: err,
    });
  }
});

usersRouter.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send({
        error: "invalid username or password",
      });
      return;
    }

    const exists = await User.findOne({ username: username }).exec();
    if (exists) {
      res.status(400).send({
        error: "user already exists.",
      });
      return;
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      passwordHash,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: err,
    });
  }
});

module.exports = usersRouter;
