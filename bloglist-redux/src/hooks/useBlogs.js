import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import useNotification from "./useNotification";

const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { notification, showNotification } = useNotification();

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => setBlogs(initialBlogs));
  }, []);

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      showNotification(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        "success",
      );
    } catch (error) {
      showNotification("Error adding blog", "error");
    }
  };

  const updateLikes = async (id, updatedBlog) => {
    try {
      const returnedBlog = await blogService.update(id, updatedBlog);
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
      showNotification(`liked: ${returnedBlog.title}`, "success");
    } catch (error) {
      showNotification("Error liking blog", "error");
    }
  };

  const deleteBlog = async (id) => {
    try {
      const blogToDelete = blogs.find((blog) => blog.id === id);
      const confirmDelete = window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`,
      );
      if (confirmDelete) {
        await blogService.remove(id);
        setBlogs(blogs.filter((blog) => blog.id !== id));
        showNotification(
          `Blog ${blogToDelete.title} by ${blogToDelete.author} removed`,
          "success",
        );
      }
    } catch (error) {
      showNotification("Error deleting blog", "error");
    }
  };

  return {
    blogs,
    addBlog,
    updateLikes,
    deleteBlog,
    notification,
  };
};

export default useBlogs;
