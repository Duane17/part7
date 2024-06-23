import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { showNotification, clearNotification } from "./notificationSlice";

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const blogs = await blogService.getAll();
  return blogs;
});

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (newBlog, { dispatch }) => {
    const blog = await blogService.create(newBlog);
    dispatch(
      showNotification({
        message: `A new blog "${blog.title}" by ${blog.author} added`,
        type: "success",
      }),
    );

    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);

    return blog;
  },
);

export const likeBlog = createAsyncThunk(
  "blogs/likeBlog",
  async (updatedBlog, { dispatch }) => {
    const blog = await blogService.update(updatedBlog.id, updatedBlog);
    dispatch(
      showNotification({ message: `Liked "${blog.title}"`, type: "success" }),
    );

    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);

    return blog;
  },
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id, { dispatch }) => {
    await blogService.remove(id);
    dispatch(showNotification({ message: "Blog removed", type: "success" }));

    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);

    return id;
  },
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(likeBlog.fulfilled, (state, action) => {
        return state.map((blog) =>
          blog.id !== action.payload.id ? blog : action.payload,
        );
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        return state.filter((blog) => blog.id !== action.payload);
      });
  },
});

export default blogSlice.reducer;
