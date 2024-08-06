import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import './NotificationDetails.css'; // Separate CSS for NotificationDetails

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const NotificationDetails = ({ notification }) => {
  // Mock data; replace with actual data fetching logic
  const chartData = {
    labels: ['Sent to','Acknowledged', 'Not Acknowledged'],
    datasets: [
      {
        label: `Notification details`,
        data: notification.data, // Replace with actual data
        backgroundColor: ['rgba(255, 183, 77, 0.2)','rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 183, 77, 1)','rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="notification-details">
      <h3>Details for Notification ID: {notification.id}</h3>
      <Bar data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default NotificationDetails;
