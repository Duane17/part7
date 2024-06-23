import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blog";
import { useNotificationContext } from "../contexts/NotificationContext";

const useBlogs = () => {
  const { dispatch } = useNotificationContext();
  const queryClient = useQueryClient();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    onError: () => {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { message: "Error fetching blogs", type: "error" },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    },
  });

  const addBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries(["blogs"]);
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
          type: "success",
        },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    },
    onError: () => {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { message: "Error adding blog", type: "error" },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
    onSuccess: (returnedBlog) => {
      queryClient.invalidateQueries(["blogs"]);
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { message: `liked: ${returnedBlog.title}`, type: "success" },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    },
    onError: () => {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { message: "Error updating blog", type: "error" },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: (id) => blogService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { message: "Blog deleted successfully", type: "success" },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    },
    onError: () => {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { message: "Error deleting blog", type: "error" },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: ({ id, comment }) => blogService.addComment(id, comment),
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(["blogs", updatedBlog.id], updatedBlog);
      queryClient.invalidateQueries(["blogs"]);
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { message: "Comment added successfully", type: "success" },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    },
    onError: () => {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: { message: "Error adding comment", type: "error" },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    },
  });

  const addBlog = async (blogObject) => {
    addBlogMutation.mutate(blogObject);
  };

  const updateLikes = async (id, updatedBlog) => {
    updateBlogMutation.mutate({ id, updatedBlog });
  };

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog.id);
    }
  };

  const addComment = async (id, comment) => {
    return addCommentMutation.mutateAsync({ id, comment });
  };

  return { blogs, isLoading, addBlog, updateLikes, deleteBlog, addComment };
};

export default useBlogs;
