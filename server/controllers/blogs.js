const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");

blogsRouter.post("/", async (req, res) => {
  try {
    // Filters
    const { title, body, author } = req.body;

    if (!(title && body && author)) {
      res.status(400).send({ error: "Title, body and author are needed" });
      return;
    }

    const blog = new Blog({
      date: new Date(),
      title: title,
      body: body,
      author: author,
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: err,
    });
  }
});

blogsRouter.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({}).exec();
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: err,
    });
  }
});

module.exports = blogsRouter;
