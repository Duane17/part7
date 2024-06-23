import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog({
      title,
      author,
      url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title text-center mb-4">Create New Blog</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Author:
            </label>
            <input
              type="text"
              className="form-control"
              id="author"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="url" className="form-label">
              URL:
            </label>
            <input
              type="url"
              className="form-control"
              id="url"
              value={url}
              name="URL"
              onChange={({ target }) => setUrl(target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
