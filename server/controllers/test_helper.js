const Blog = require("../models/Blog");

const cleanDB = async () => {
  await Blog.remove({});
};
const initialBlogs = [
  {
    title: "first blog",
    body: "caramelo",
    author: "admin",
  },
  {
    title: "second blog",
    body: "de chocolate",
    author: "imaand",
  },
  {
    title: "third blog",
    body: "embarramelo",
    author: "bebito fiu fiu",
  },
];

const initDB = async () => {
  for (let blog of initialBlogs) {
    let addBlog = new Blog(blog);
    await addBlog.save();
  }
};

module.exports = { cleanDB, initialBlogs, initDB };
