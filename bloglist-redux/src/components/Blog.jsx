import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../redux/blogSlice";

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    dispatch(likeBlog(updatedBlog));
  };

  const handleDelete = () => {
    dispatch(deleteBlog(blog.id));
  };

  return (
    <div
      className="blog"
      style={{
        border: "1px solid black",
        padding: "10px",
        marginBottom: "5px",
      }}
    >
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} id={`toggle-visibility-${blog.id}`}>
          {visible ? "hide" : "view"}
        </button>
      </div>
      {visible && (
        <div>
          <p className="blog-url">{blog.url}</p>
          <p className="blog-likes">
            likes <span id={`likes-${blog.id}`}>{blog.likes}</span>{" "}
            <button onClick={handleLike} id={`like-button-${blog.id}`}>
              like
            </button>
          </p>
          <p>{blog.user ? blog.user.name : "unknown user"}</p>
          {blog.user && blog.user.username === user.username && (
            <button onClick={handleDelete} id={`delete-button-${blog.id}`}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
