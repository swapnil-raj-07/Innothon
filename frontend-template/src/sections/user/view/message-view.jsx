import * as React from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';

import { useData } from 'src/dataContext';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function MessagePage() {
  const { postData, user } = useData();

  const [timing, setTiming] = React.useState('AfterLogin');
  const [group, setGroup] = React.useState('All');
  const [type, setType] = React.useState('password');
  const [header, setHeader] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [pointer, setPointer] = React.useState('');
  const [publishingTime, setPublishingTime] = React.useState('');

  const handleTimingChange = (event) => {
    setTiming(event.target.value);
  };

  const handleGroupChange = (event) => {
    setGroup(event.target.value);
  };

  const handleType = (event) => {
    setType(event.target.value);
  };
 
  const handleSend = () => {
    console.log('Post', {
      header,
      body: message,
      type,
      groupId: group,
      scheduledDate: publishingTime.split('T')[0],
      scheduledTime: publishingTime.split('T')[1],
      mode: timing,
      points: pointer,
      imagePath: `/assets/images/covers/cover_1.jpg`,
      createdDate: new Date().toISOString(),
      createdBy: user.firstName,
    });
    postData('http://localhost:3000/notification', {
      header,
      body: message,
      type,
      groupId: group,
      scheduledDate: publishingTime.split('T')[0],
      scheduledTime: publishingTime.split('T')[1],
      mode: timing,
      points: pointer,
      imagePath: `/assets/images/covers/cover_1.jpg`,
      createdDate: new Date().toISOString(),
      createdBy: user.firstName,
    });
  };

  return (
    <Container>
      <Card>
        <Stack spacing={3} p={2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4"> Send Message </Typography>
          </Stack>
          <TextField
            name="header"
            label="Header"
            value={header}
            onChange={(event) => {
              setHeader(event.target.value);
            }}
            required
          />
          <TextField
            name="message"
            label="Message"
            required
            multiline
            rows={4}
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Stack>
              <InputLabel>Publishing Time</InputLabel>
              <TextField
                name="publishingTime"
                type="datetime-local"
                required
                value={publishingTime}
                onChange={(event) => {
                  setPublishingTime(event.target.value);
                }}
              />
            </Stack>

            <Stack>
              <InputLabel id="demo-simple-select">Group</InputLabel>
              <Select
                id="demo-simple-select"
                label="Group"
                value={group}
                onChange={handleGroupChange}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="GP">GP</MenuItem>
                <MenuItem value="KAES">KAES</MenuItem>
                <MenuItem value="Infor">Infor</MenuItem>
              </Select>
            </Stack>

            <Stack>
              <InputLabel id="demo-simple-select-2">Timing</InputLabel>
              <Select
                id="demo-simple-select-2"
                label="Timing"
                value={timing}
                onChange={handleTimingChange}
              >
                <MenuItem value="Noon">Noon</MenuItem>
                <MenuItem value="Evening">Evening</MenuItem>
                <MenuItem value="AfterLogin">After Login</MenuItem>
              </Select>
            </Stack>

            <Stack>
              <InputLabel id="demo-simple-select-3">Type</InputLabel>
              <Select id="demo-simple-select-3" label="Type" value={type} onChange={handleType}>
                <MenuItem value="password">Password</MenuItem>
                <MenuItem value="data_breach">Data Breach</MenuItem>
              </Select>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <TextField
              name="pointer"
              label="Pointer"
              type="number"
              required
              value={pointer}
              onChange={(event) => {
                setPointer(event.target.value);
              }}
            />

            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:paper-plane-fill" />}
              onClick={() => {
                console.log('Send message', {
                  header,
                  message,
                  timing,
                  group,
                  pointer,
                  publishingTime,
                });

                handleSend();
              }}
            >
              Send
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Container>
  );
}
