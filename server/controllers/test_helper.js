const Blog = require("../models/Blog");
const User = require("../models/User");

const cleanBlogs = async () => {
  await Blog.deleteMany({});
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

async function initBlogs() {
  await Blog.insertMany(initialBlogs);
}

async function cleanUsers() {
  await User.deleteMany({});
}

const initialUsers = [
  {
    username: "admin",
    passwordHash: "admin",
  },
  {
    username: "mod",
    passwordHash: "mod",
  },
];

async function initUsers() {
  await User.insertMany(initialUsers);
}

module.exports = {
  cleanBlogs,
  initialBlogs,
  initBlogs,
  cleanUsers,
  initialUsers,
  initUsers,
};
