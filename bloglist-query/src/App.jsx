import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notification from './components/Notification';
import Users from './components/Users';
import Home from './components/Home';
import Blogs from './components/Blogs';
import UserDetails from './components/UserDetails';
import BlogDetails from './components/BlogDetails';
import Navbar from './components/Navbar';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="container container-medium flex-grow-1 mt-4">
          <div className="row">
            <div className="col-12">
              <Notification />
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserDetails />} />
          </Routes>
        </div>
        <footer className="bg-light text-center text-muted py-3 mt-4">
          © 2023 Blog App
        </footer>
      </div>
    </Router>
  );
};

export default App;