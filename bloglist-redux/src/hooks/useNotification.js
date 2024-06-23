import { useDispatch, useSelector } from "react-redux";
import {
  showNotification as show,
  clearNotification,
} from "../redux/notificationSlice";

const useNotification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  const showNotification = (message, type, duration = 5000) => {
    dispatch(show({ message, type }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, duration);
  };

  return { notification, showNotification };
};

export default useNotification;
