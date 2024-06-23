import React from "react";
import { useNotificationContext } from "../contexts/NotificationContext";

const Notification = () => {
  const { state } = useNotificationContext();
  const { message, type } = state;

  if (message === null) {
    return null;
  }

  const alertClass = type === "error" ? "alert-danger" : "alert-success";

  return (
    <div
      className={`alert ${alertClass} alert-dismissible fade show`}
      role="alert"
    >
      {message}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Notification;
