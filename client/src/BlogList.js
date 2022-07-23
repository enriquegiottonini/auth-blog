import React from "react";
import blogService from "./services/blogs";
import axios from "axios";

const Blog = ({ blog }) => {
  const { date, author, title, body, id } = blog;
  return (
    <div>
      <p>
        <b>{date}</b> - {author}
      </p>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  );
};

const BlogList = ({ blogs }) => {
  if (!blogs) {
    return <p>Loading ...</p>;
  } else {
    blogs.reverse();
    return (
      <div>
        {blogs.map((blog) => {
          return <Blog key={blog.id} blog={blog} />;
        })}
      </div>
    );
  }
};

export default BlogList;
