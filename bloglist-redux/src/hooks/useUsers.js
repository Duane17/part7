import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser, setUser } from "../redux/userSlice";
import blogService from "../services/blogs";

const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);

  const login = (credentials) => {
    dispatch(loginUser(credentials));
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  const checkLoggedInUser = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  };

  return { user, login, logout, checkLoggedInUser, notification };
};

export default useUser;
