/* const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");

const Blog = require("../models/Blog");

describe("getting blogs from db", () => {
  beforeEach(async () => {
    await helper.cleanBlogs();
    await helper.initBlogs();
  });

  test("getting all thorugh api", async () => {
    const response = await api.get("/api/blogs").expect(200);
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("id has not the 24 characters lenght for mongoose id", async () => {
    await api.get("/api/blogs/62dosdmps").expect(400);
  });

  test("unexisting id", async () => {
    await api.get("/api/blogs/62d8ade26c894756c69a2999").expect(404);
  });

  test("valid id", async () => {
    const newBlog = {
      title: "new title",
      body: "lorem ipsum dolot sit amet",
      author: "admin",
    };

    const response = await api.post("/api/blogs").send(newBlog).expect(201);
    const getById = await api.get(`/api/blogs/${response.body.id}`).expect(200);
    expect(response.body).toEqual(response.body);
  });
});

describe("adding new posts", () => {
  beforeEach(async (done) => {
    await helper.cleanBlogs();
    await helper.initBlogs();
    done();
  });

  test("succeds with valid data", async () => {
    const newBlog = {
      title: "foruth blog",
      body: "this is the forutoo blog into the db",
      author: "hello caramelo de chocolate",
    };
    await api.post("/api/blogs").send(newBlog).expect(201);
    const blogs = await Blog.find({}).exec();
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1);
  });
});

describe("adding invalid posts", () => {
  beforeEach(async () => {
    await helper.cleanBlogs();
    await helper.initBlogs();
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

describe("deleting a blog", () => {
  beforeEach(async () => {
    await helper.cleanBlogs();
    await helper.initBlogs();
  });

  test("with valid id", async () => {
    const blogs = await api.get("/api/blogs").expect(200);
    const id = blogs.body[0].id;
    await api.delete(`/api/blogs/${id}`).expect(200);
  });

  test("with invalid id", async () => {
    const id = "888";
    await api.delete(`/api/blogs/${id}`).expect(400);
  });

  test("with unexisting id", async () => {
    const id = "62d8ade26c894756c69a2999";
    await api.delete(`/api/blogs/${id}`).expect(404);
  });
});
 */
