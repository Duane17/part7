import React, { useRef } from "react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { useUserContext } from "../contexts/UserContext";
import useBlogs from "../hooks/useBlogs";

const Blogs = () => {
  const { state: user } = useUserContext();
  const { blogs, isLoading, addBlog } = useBlogs();
  const blogFormRef = useRef();

  const handleAddBlog = async (blogObject) => {
    await addBlog(blogObject);
    blogFormRef.current.toggleVisibility();
  };

  if (user === null) {
    return <p className="alert alert-warning">Please log in to view blogs.</p>;
  }

  return (
    <div className="container container-narrow mt-4">
      <div className="row justify-content-center mb-4">
        <div className="col-md-8">
          <Togglable
            buttonLabel="Create new blog"
            buttonClass="btn btn-primary w-100"
            ref={blogFormRef}
          >
            <BlogForm createBlog={handleAddBlog} />
          </Togglable>
        </div>
      </div>
      <div className="mt-4">
        {isLoading ? (
          <p className="text-center">Loading blogs...</p>
        ) : (
          blogs.map((blog) => <Blog key={blog.id} blog={blog} />)
        )}
      </div>
    </div>
  );
};

export default Blogs;
