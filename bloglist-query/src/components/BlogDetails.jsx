import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlogContext } from '../contexts/BlogContext';
import useBlogs from '../hooks/useBlogs';
import { useUserContext } from '../contexts/UserContext';
import blogService from '../services/blog';

const BlogDetails = () => {
  const [comment, setComment] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const { state: { blog, isLoading, error }, dispatch } = useBlogContext();
  const { updateLikes, deleteBlog } = useBlogs();
  const { state: user } = useUserContext();

  useEffect(() => {
    const fetchBlog = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const fetchedBlog = await blogService.getBlog(id);
        dispatch({ type: 'SET_BLOG', payload: fetchedBlog });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Error fetching blog' });
      }
    };
    fetchBlog();
  }, [id, dispatch]);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleAddComment = async (event) => {
    event.preventDefault();
    try {
      await blogService.addComment(id, comment);
      dispatch({ type: 'ADD_COMMENT', payload: comment });
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleLike = async () => {
    if (blog) {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
      };
      await updateLikes(id, updatedBlog);
      dispatch({ type: 'UPDATE_LIKES', payload: updatedBlog.likes });
    }
  };

  const handleDelete = async () => {
    if (blog) {
      await deleteBlog(blog);
      navigate('/blogs');
    }
  };

  if (isLoading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;
  if (!blog) return null;
  if (!user) return null;

  return (
    <div className="container container-narrow mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{blog.title}</h2>
          <h6 className="card-subtitle mb-2 text-muted">by {blog.author}</h6>
          <p className="card-text">
            <a href={blog.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
              {blog.url}
            </a>
          </p>
          <p className="card-text">
            {blog.likes} likes 
            <br />
            <button onClick={handleLike} className="btn btn-outline-primary btn-sm ms-2">Like</button>
          </p>
          <p className="card-text">Added by {blog.user.name}</p>
          {blog.user && user && blog.user.username === user.username && (
            <button onClick={handleDelete} className="btn btn-danger mb-3">Remove</button>
          )}

          <h3 className="mt-4">Comments</h3>
          <form onSubmit={handleAddComment} className="mb-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={comment}
                onChange={({ target }) => setComment(target.value)}
                placeholder="Write a comment..."
              />
              <button type="submit" className="btn btn-primary">Add comment</button>
            </div>
          </form>
          {blog.comments.length > 0 ? (
            <ul className="list-group">
              {blog.comments.map((comment, index) => (
                <li key={index} className="list-group-item">{comment}</li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
