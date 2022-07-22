const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");

blogsRouter.post("/", async (req, res) => {
  try {
    // Filters
    const { title, body, author } = req.body;
    if (!author) {
      res.status(400).send({ error: "Id author is needed" });
      return;
    }

    if (author.length !== 24) {
      res.status(500).send({
        error: `${author} must be a 24 hex characters string.`,
      });
      return;
    }

    const exists = await User.findById(author);
    if (!exists) {
      res.status(404).send({ error: "id not found." });
      return;
    }

    if (!(title && body)) {
      res.status(400).send({ error: "Title and body are needed" });
      return;
    }

    const blog = new Blog({
      date: new Date(),
      title: title,
      body: body,
      author: author,
    });

    const savedBlog = await blog.save();

    exists.blogs = exists.blogs.concat(savedBlog.id);
    await exists.save();
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

blogsRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id.trim();
    if (id.length !== 24) {
      res.status(400).send({
        error: `${id} must be a 24 hex characters string.`,
      });
      return;
    }
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).send({
        error: "not found",
      });
      return;
    }

    res.status(200).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: err,
    });
  }
});

blogsRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id.trim();
    if (id.length !== 24) {
      res.status(400).send({
        error: `${id} must be a 24 hex characters string.`,
      });
      return;
    }
    const blog = await Blog.findByIdAndRemove(id);
    if (!blog) {
      res.status(404).send({
        error: "not found",
      });
      return;
    }

    res.status(200).send({
      message: "deleted",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: err,
    });
  }
});

module.exports = blogsRouter;
