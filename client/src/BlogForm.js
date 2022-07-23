import React from "react";
import axios from "axios";
import blogService from "./services/blogs";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

import { useState } from "react";

const BlogForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (title && body) {
        const newBlog = {
          title: title,
          body: body,
        };

        const addedBlog = await blogService.create(newBlog);
        setBlogs([addedBlog, ...blogs]);
      }
    } catch (error) {
      console.error(error);
      toast("please log in again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setTitle("");
    setBody("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          title:
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </label>
        <label>
          body:
          <input
            value={body}
            onChange={({ target }) => setBody(target.value)}
          ></input>
        </label>
        <button onClick={handleSubmit}>post</button>
      </form>
    </div>
  );
};

export default BlogForm;
