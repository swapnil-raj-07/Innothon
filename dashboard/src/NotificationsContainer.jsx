import React, { useEffect, useState } from 'react';
import './NotificationsContainer.css'; // Separate CSS for NotificationsContainer

const NotificationsContainer = ({ onSelectNotification }) => {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications (replace with actual API call)
  useEffect(() => {
    const fetchNotifications = async () => {
      // Mock data
      const data = [
        { id: 1, message: 'Stay vigilant! Cyber criminals often use phishing emails to trick you into revealing personal information', data: [100, 75, 25] },
        { id: 2, message: 'Your passwords are your first line of defense against cyber attacks. Create strong, unique passwords for each of your accounts.', data: [80, 50, 30] },
        { id: 3, message: 'Keep your software up to date! Software updates often include important security patches that protect against new threats', data: [60, 40, 20] },
        { id: 4, message: 'Be cautious when using public Wi-Fi networks. They can be a hotspot for hackers looking to intercept your data' , data: [90, 60, 30]},
        { id: 5, message: 'Lock your devices with strong passwords or biometric authentication (like fingerprint or facial recognition) to prevent unauthorized access', data: [70, 50, 20] },
      ];
      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notifications-container">
      <h3>Recent Notifications</h3>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id} onClick={() => onSelectNotification(notification)}>
            <h3>{notification.id}</h3> {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsContainer;
