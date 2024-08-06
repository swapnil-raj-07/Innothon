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

  const [timing, setTiming] = React.useState('1');
  const [group, setGroup] = React.useState('0');
  const [type, setType] = React.useState('1');
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

  const handleSend = async () => {
    const obj = {
      header,
      body: message,
      type: Number(type),
      active: true,
      groupId: group !== '0' ? Number(group) : undefined,
      scheduledDate: publishingTime.split('T')[0],
      scheduledTime: publishingTime.split('T')[1],
      mode: Number(timing),
      points: Number(pointer),
      createdDate: new Date().toISOString(),
      createdBy: user.firstName,
    };

    console.log('Post', { obj });
    await postData('notification', obj);
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
                <MenuItem value="0">ALL</MenuItem>
                <MenuItem value="1">HR</MenuItem>
                <MenuItem value="2">Technology</MenuItem>
                <MenuItem value="3">Finance</MenuItem>
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
                <MenuItem value="1">Immediate</MenuItem>
                <MenuItem value="2">Hourly</MenuItem>
                <MenuItem value="3">Weekly</MenuItem>
                <MenuItem value="4">Monthly</MenuItem>
              </Select>
            </Stack>

            <Stack>
              <InputLabel id="demo-simple-select-3">Type</InputLabel>
              <Select id="demo-simple-select-3" label="Type" value={type} onChange={handleType}>
                <MenuItem value="1">Authentication</MenuItem>
                <MenuItem value="2">Data Breach</MenuItem>
                <MenuItem value="3">Data BackUp</MenuItem>
                <MenuItem value="4">Password</MenuItem>
                <MenuItem value="5">Phishing</MenuItem>
                <MenuItem value="6">Security</MenuItem>
                <MenuItem value="7">Threat</MenuItem>
                <MenuItem value="8">Software</MenuItem>
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
