import React from 'react';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <Link to={`/blogs/${blog.id}`} className="text-decoration-none">
          <h5 className="card-title">{blog.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">by {blog.author}</h6>
        </Link>
      </div>
    </div>
  );
};

export default Blog;