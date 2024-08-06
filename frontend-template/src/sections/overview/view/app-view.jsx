import { useState } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import DisplayData from '../display-data';
import AppNewsUpdate from '../app-news-update';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';

const notificationsList = [
  {
    id: '1',
    title: 'News 1',
    description: 'Description 1',
    postedAt: new Date(),
    sent_to: 100,
    acknowledged: 75,
    not_acknowledged: 25,
    image: `/assets/images/covers/cover_1.jpg`,

  },
  {
    id: '2',
    title: 'News 2',
    description: 'Description 2',
    postedAt: new Date(),
    sent_to: 100,
    acknowledged: 80,
    not_acknowledged: 20,
    image: `/assets/images/covers/cover_2.jpg`,
  },
  {
    id: '3',
    title: 'News 3',
    description: 'Description 3',
    postedAt: new Date(),
    sent_to: 100,
    acknowledged: 70,
    not_acknowledged: 30,
    image: `/assets/images/covers/cover_3.jpg`,
  },
  {
    id: '4',
    title: 'News 4',
    description: 'Description 3',
    postedAt: new Date(),
    sent_to: 100,
    acknowledged: 70,
    not_acknowledged: 30,
    image: `/assets/images/covers/cover_4.jpg`,
  },
  {
    id: '5',
    title: 'News 5',
    description: 'Description 3',
    postedAt: new Date(),
    sent_to: 100,
    acknowledged: 70,
    not_acknowledged: 30,
    image: `/assets/images/covers/cover_5.jpg`,
  },

 
];

export default function AppView() {
  const [selectedNotification, setSelectedNotification] = useState(notificationsList[0]);

  const handleNotificationClick = (notification) => {
    console.log('notification', notification)
    setSelectedNotification(notificationsList.find(i => i.id === notification.id));
  };

  

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Notifications Sent"
            total={120}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Users"
            total={1352831}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Successful"
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>
        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2024',
                '02/01/2024',
                '03/01/2024',
                '04/01/2024',
                '05/01/2024',
                '06/01/2024',
                '07/01/2024'
              ],
              series: [
                {
                  name: 'KAES',
                  type: 'line',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37],
                },
                {
                  name: 'GP',
                  type: 'line',
                  fill: 'solid',
                  data: [44, 55, 41, 67, 22, 43, 21],
                },
                {
                  name: 'Infor',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64],
                },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Visits"
            chart={{
              series: [
                { label: 'KAES', value: 4344 },
                { label: 'GP', value: 1443 },
                { label: 'Infor', value: 4500 },
              ],
            }}
          />
        </Grid>
        {/* <Grid xs={12} md={6} lg={12}>
          <AppConversionRates
            title="User traffic data"
            chart={{
              series: [
                { label: '00:00 - 06:00', value: 100 },
                { label: '06:00 - 10:00', value: 130 },
                { label: '10:00 - 13:00', value: 250 },
                { label: '13:00 - 16:00', value: 470 },
                { label: '16:00 - 19:00', value: 690 },
                { label: '19:00 - 22:00', value: 540 },
                { label: '22:00 - 00:00', value: 240  },
              ],
            }}
          />
        </Grid> */}
         {/* <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid> */}

      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid xs={12} md={7}>
            <AppNewsUpdate
              title="Notification Update"
              list={notificationsList}
              onNewsClick={handleNotificationClick}
            />
          </Grid>
        <Grid xs={12} md={5}>
          <DisplayData news={selectedNotification} />
        </Grid>
      </Grid>
    </Container>

      </Grid>
    </Container>
  );
}
