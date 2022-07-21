require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

app.get("/", (req, res) => {
  res.end("Hello loser . \n");
});

module.exports = app;
