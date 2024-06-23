import React from "react";
import { useUserContext } from "../contexts/UserContext";
import LoginForm from "./LoginForm";

const Home = () => {
  const { state: user, login } = useUserContext();

  return (
    <div className="container container-narrow mt-4">
      <h2 className="mb-4 text-center">Welcome to the Blog App</h2>
      {user === null ? (
        <div>
          <p className="mb-4 text-center">
            Please log in to access blogs and users information.
          </p>
          <div className="d-flex justify-content-center">
            <LoginForm handleLogin={login} />
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Welcome back, {user.username}!</h5>
            <p className="card-text">
              You can now view and create blogs, as well as see other users'
              information.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
