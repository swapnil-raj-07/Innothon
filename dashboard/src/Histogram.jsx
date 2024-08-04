import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import './Histogram.css'; // Add your CSS for styling

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Histogram = () => {
  const histogramData = {
    labels: ['Sent To', 'Acknowledged', 'Not Acknowledged'],
    datasets: [
      {
        label: 'Overall Notification Statistics',
        data: [1200, 800, 400], // Example data
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="histogram">
      <h3>Overall Notification Statistics</h3>
      <Bar data={histogramData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default Histogram;
