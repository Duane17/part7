import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import { fetchBlogs } from "./redux/blogSlice";
import useUser from "./hooks/useUsers";

const App = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const blogs = useSelector((state) => state.blogs);
  const { user, login, logout, checkLoggedInUser } = useUser();

  useEffect(() => {
    dispatch(fetchBlogs());
    checkLoggedInUser();
  }, [dispatch]);

  const handleLogin = async (credentials) => {
    login(credentials);
  };

  const handleLogout = () => {
    logout();
  };

  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <Notification />
      {user === null ? (
        <>
          <h2>Log in to application</h2>
          <LoginForm handleLogin={handleLogin} />
        </>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.username} logged-in{" "}
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          {sortedBlogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
