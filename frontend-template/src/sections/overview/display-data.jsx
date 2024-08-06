import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent'; // Ensure you have react-apexcharts installed

function DisplayData({ news }) {
  const chartOptions = {
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: ['Sent To', 'Acknowledged', 'Not Acknowledged'],
    },
  };

  const chartSeries = [
    {
      name: news.title,
      data: [news.sent_to, news.acknowledged, news.not_acknowledged],
        // data: [100,74,26]
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {news.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {news.description}
        </Typography>
        <Chart
          options={chartOptions}
          series= {chartSeries}
          type="bar"
          height={350}
          dir = "ltr"
        />
      </CardContent>
    </Card>
  );
}

DisplayData.propTypes = {
  news: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    sent_to: PropTypes.number,
    acknowledged: PropTypes.number,
    not_acknowledged: PropTypes.number,
  }).isRequired,
};

export default DisplayData;
