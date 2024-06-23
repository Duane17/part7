import React, { createContext, useContext, useReducer } from "react";

const BlogContext = createContext();

const initialState = {
  blog: null,
  isLoading: true,
  error: null,
};

const blogReducer = (state, action) => {
  switch (action.type) {
    case "SET_BLOG":
      return { ...state, blog: action.payload, isLoading: false, error: null };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    case "UPDATE_LIKES":
      return { ...state, blog: { ...state.blog, likes: action.payload } };
    case "ADD_COMMENT":
      return {
        ...state,
        blog: {
          ...state.blog,
          comments: [...state.blog.comments, action.payload],
        },
      };
    default:
      return state;
  }
};

export const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialState);

  return (
    <BlogContext.Provider value={{ state, dispatch }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogContext must be used within a BlogProvider");
  }
  return context;
};
