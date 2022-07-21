const bcrypt = require("bcrypt");
const User = require("../models/User");
const usersRouter = require("express").Router();

usersRouter.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send({
        error: "invalid username or password",
      });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      passwordHash,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {}
});

module.exports = usersRouter;
