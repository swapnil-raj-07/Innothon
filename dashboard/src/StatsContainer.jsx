import React from 'react';
import './StatsContainer.css'; // Ensure this CSS file is updated as well

const StatsContainer = () => {
  // Example data; replace with actual data fetching logic
  const stats = {
    totalUsers: 1500,
    totalNotifications: 120,
    totalAdmins: 5,
  };

  return (
    <div className="stats-container">
      <h2>Dashboard Statistics</h2>
      <div className="stats-item">
        <h3>Total Users</h3>
        <p>{stats.totalUsers}</p>
      </div>
      <div className="stats-item">
        <h3>Total Notifications Sent</h3>
        <p>{stats.totalNotifications}</p>
      </div>
    </div>
  );
};

export default StatsContainer;
