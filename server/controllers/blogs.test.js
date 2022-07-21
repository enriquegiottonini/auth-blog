const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");

const Blog = require("../models/Blog");

test("getting blogs from db", async () => {
  const response = await api.get("/api/blogs").expect(200);
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

describe("adding new posts", () => {
  beforeEach(async () => {
    await helper.cleanDB();
    await helper.initDB();
  });

  test("succeds with valid data", async () => {
    const newBlog = {
      title: "foruth blog",
      body: "this is the forutoo blog into the db",
      author: "hello caramelo de chocolate",
    };
    await api.post("/api/blogs").send(newBlog).expect(201);

    const blogs = await Blog.find({});
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1);
  });
});

describe("adding invalid posts", () => {
  beforeEach(async () => {
    await helper.cleanDB();
    await helper.initDB();
  });

  test("title, body, or author missing", async () => {
    const blog1 = {
      body: "this blog has no title",
      author: "admin",
    };
    let response = await api.post("/api/blogs").send(blog1).expect(400);
    expect(response.body.error).toEqual("Title, body and author are needed");

    const blog2 = {
      title: "this blog has no body",
      author: "admin",
    };
    response = await api.post("/api/blogs").send(blog2).expect(400);
    expect(response.body.error).toEqual("Title, body and author are needed");

    const blog3 = {
      body: "this blog has no author",
      title: "no",
    };
    response = await api.post("/api/blogs").send(blog3).expect(400);
    expect(response.body.error).toEqual("Title, body and author are needed");
  });
});
