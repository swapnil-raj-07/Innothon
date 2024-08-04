import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import './OverallStats.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OverallStats = () => {
  // Mock data; replace with actual data fetching logic
  const chartData = {
    labels: ['Total notifications', 'Acknowledged', 'Not Acknowledged'],
    datasets: [
      {
        label: 'Overall Stats',
        data: [1000, 850, 150], 
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,

      },
    ],
  };

  return (
    <div className="overall-stats">
      <h3>Overall Statistics</h3>
      <Bar data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default OverallStats;
