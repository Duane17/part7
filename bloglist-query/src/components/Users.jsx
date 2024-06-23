import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userService from '../services/users';
import { useUserContext } from '../contexts/UserContext';

const Users = () => {
  const [users, setUsers] = useState([]);
  const { state: user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    userService.getAll().then((initialUsers) => {
      setUsers(initialUsers);
    });
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="container container-narrow mt-4">
      <h2 className="mb-4">Users</h2>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`} className="text-primary text-decoration-none">
                  {user.name}
                  </Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;