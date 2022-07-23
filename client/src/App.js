import React from "react";
import "./styles/App.css";
import Login from "./Login";
import loginService from "./services/login";
import blogService from "./services/blogs";

import { useState } from "react";
import { useEffect } from "react";
import BlogList from "./BlogList";

import axios from "axios";
import BlogForm from "./BlogForm";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  // Check 'cookies' for logged in user
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  useEffect(() => {
    if (user) blogService.setToken(user.token);
  }, [user]);

  useEffect(() => {
    async function retrieveBlogs() {
      setBlogs(await blogService.getAll());
    }
    retrieveBlogs();
  }, []);

  const loginForm = () =>
    user ? (
      <div>
        <div>
          <p>{user.username} logged in.</p>
          <p>token: {user.token}</p>
          <button
            onClick={() => {
              window.localStorage.removeItem("loggedUser");
              setUser(null);
            }}
          >
            logout
          </button>
        </div>
        <BlogForm blogs={blogs} setBlogs={setBlogs} />
      </div>
    ) : (
      <Login user={user} setUser={setUser} />
    );

  return (
    <div>
      <h1 className="heading__one">React application!!</h1>
      {loginForm()}

      <div>
        <BlogList blogs={blogs} />
      </div>
    </div>
  );
};

export default App;
