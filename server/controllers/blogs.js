const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");

const jwt = require("jsonwebtoken");
const getTokenFrom = (request) => {
  const auth = request.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    return auth.substring(7);
  }
  return null;
};

blogsRouter.post("/", async (req, res) => {
  try {
    const token = getTokenFrom(req);

    if (!token) {
      res.status(401).send({ error: "tauth needed, bearer missing" });
      return;
    }
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const author = decodedToken.id;

    if (author.length !== 24) {
      res.status(500).send({
        error: `${author} must be a 24 hex characters string.`,
      });
      return;
    }
    // Filters
    const { title, body } = req.body;

    const exists = await User.findById(author).exec();
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
      author: exists.username,
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
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).send({
        error: "not found",
      });
      return;
    }

    // Authorization
    const token = getTokenFrom(req);
    if (!token) {
      res.status(401).send({ error: "auth needed, bearer missing" });
      return;
    }
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const author = decodedToken.id;

    if (!(author !== blog.id)) {
      return res.status(401).json({
        error: "unauthorized",
      });
    }

    await blog.remove();

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
