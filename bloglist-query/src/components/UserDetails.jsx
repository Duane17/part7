import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import userService from "../services/users";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    userService.getUser(id).then((fetchedUser) => {
      setUser(fetchedUser);
    });
  }, [id]);

  if (!user) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container container-narrow mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{user.name}</h2>
          <h3 className="card-subtitle mb-3 text-muted">Added blogs</h3>
          {user.blogs.length > 0 ? (
            <ul className="list-group">
              {user.blogs.map((blog) => (
                <li key={blog.id} className="list-group-item">
                  <Link
                    to={`/blogs/${blog.id}`}
                    className="text-decoration-none"
                  >
                    {blog.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="card-text">This user hasn't added any blogs yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
