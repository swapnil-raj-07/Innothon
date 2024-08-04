import React, { useState } from 'react';
import './DashboardContainer.css'; // Updated CSS for layout
import NotificationDetails from './NotificationDetails';
import NotificationsContainer from './NotificationsContainer';
import OverallStats from './OverallStats'; // Import the new component
import PieChart from './PieChart';
import StatsContainer from './StatsContainer';

const DashboardContainer = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const labels= ['12-3', '3-6', '6-9', '9-12', '12-12']
  const lables2= ['user1', 'user2', 'user3', 'user4']
  const pieName = "User interaction time"
  const pieName2 = "Most active users"

  return (
    <div className="dashboard-container">
      <StatsContainer />
      <div className="main-content">
        <NotificationsContainer onSelectNotification={setSelectedNotification} />
        {selectedNotification 
          ? <NotificationDetails notification={selectedNotification} /> 
          : <OverallStats /> /* Render OverallStats when no notification is selected */
        }
      </div>
      <div className='pie-content'>
        <div><PieChart labels = {labels} title = {pieName} /></div>
        <div><PieChart labels = {lables2} title = {pieName2} /></div>
      </div>
    </div>
  );
};

export default DashboardContainer;
