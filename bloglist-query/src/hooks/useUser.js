import { useState, useEffect } from "react";
import blogService from "../services/blog";
import loginService from "../services/login";
import { useNotificationContext } from "../contexts/NotificationContext";

const useUser = () => {
  const [user, setUser] = useState(null);
  const { dispatch } = useNotificationContext();

  useEffect(() => {
    checkLoggedInUser();
  }, []);

  const checkLoggedInUser = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  };

  const login = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          message: `${user.username} logged in successfully`,
          type: "success",
        },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    } catch (exception) {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { message: "Wrong username or password", type: "error" },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    }
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogAppUser");
    blogService.setToken(null);
    dispatch({
      type: "SET_NOTIFICATION",
      payload: { message: "Logged out", type: "success" },
    });
    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
    }, 5000);
    console.log("logged out");
  };

  return { user, login, logout, checkLoggedInUser };
};

export default useUser;
