import { useState } from "react";

const useNotification = () => {
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000);
  };

  return { notification, showNotification };
};

export default useNotification;
