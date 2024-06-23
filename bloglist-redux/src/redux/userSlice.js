import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { showNotification, clearNotification } from "./notificationSlice";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, { dispatch }) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(
        showNotification({
          message: `${user.username} logged in successfully`,
          type: "success",
        }),
      );
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
      return user;
    } catch (error) {
      dispatch(
        showNotification({
          message: "Wrong username or password",
          type: "error",
        }),
      );
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
      throw error;
    }
  },
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { dispatch }) => {
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    dispatch(
      showNotification({ message: "Successfully logged out", type: "success" }),
    );
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
    return null;
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => action.payload)
      .addCase(logoutUser.fulfilled, () => null);
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
