import React, { createContext, useReducer, useContext, useEffect } from "react";
import blogService from "../services/blog";
import loginService from "../services/login";
import { useNotificationContext } from "./NotificationContext";

const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    case "CLEAR_USER":
      return null;
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, null);
  const { dispatch: notificationDispatch } = useNotificationContext();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch({ type: "SET_USER", payload: user });
      blogService.setToken(user.token);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      dispatch({ type: "SET_USER", payload: user });
      blogService.setToken(user.token);
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: {
          message: `${user.username} logged in successfully`,
          type: "success",
        },
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
      return true;
    } catch (exception) {
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: { message: "Wrong username or password", type: "error" },
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
      return false;
    }
  };

  const logout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch({ type: "CLEAR_USER" });
    blogService.setToken(null);
    notificationDispatch({
      type: "SET_NOTIFICATION",
      payload: { message: "Logged out", type: "success" },
    });
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR_NOTIFICATION" });
    }, 5000);
  };

  return (
    <UserContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
