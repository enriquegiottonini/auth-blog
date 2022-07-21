const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");

const User = require("../models/User");

describe("adding new users", () => {
  test("valid user, no blogs", async () => {
    const newUser = {
      username: "admin",
      password: "quesadilla",
    };
    const result = await api.post("/api/users").send(newUser).expect(201);
  });

  test("inexisting username or password", async () => {
    const newUser = {
      username: "",
      password: "quesadilla",
    };
    await api.post("/api/users").send(newUser).expect(400);
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
