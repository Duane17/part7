import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBlog, faUsers, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { state: user, logout } = useUserContext();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Blog App</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <FontAwesomeIcon icon={faHome} /> Home
              </Link>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/blogs">
                    <FontAwesomeIcon icon={faBlog} /> Blogs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    <FontAwesomeIcon icon={faUsers} /> Users
                  </Link>
                </li>
              </>
            )}
          </ul>
          {user && (
            <span className="navbar-text">
              {user.username} logged in
              <button className="btn btn-outline-secondary ms-2" onClick={logout}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </button>
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
