import React from 'react';
import './notification.css';

const Notification = ({ message, show }) => {
  return (
    show && (
      <div className="notification-bar">
        {message}
      </div>
    )
  );
};

export default Notification;
