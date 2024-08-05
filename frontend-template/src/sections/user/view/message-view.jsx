import * as React from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function MessagePage() {

  const [timing, setTiming] = React.useState('AfterLogin');
  const [group, setGroup] = React.useState('All');

  return (
    <Container>
      <Card>
        <Stack spacing={3} p={2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4"> Send Message </Typography>
          </Stack>
          <TextField name="header" label="Header" required />
          <TextField name="message" label="Message" required multiline rows={4} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            
            <Stack>
              <InputLabel>Publishing Time</InputLabel>
              <TextField name="publishingTime" type="datetime-local" required />
            </Stack>

            <Stack>
              <InputLabel id="demo-simple-select">Group</InputLabel>
              <Select
                id="demo-simple-select"
                label="Group"
                value={group}
                // onChange={handleChange}
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
              // onChange={handleChange}
            >
              <MenuItem value="Noon">Noon</MenuItem>
              <MenuItem value="Evening">Evening</MenuItem>
              <MenuItem value="AfterLogin">After Login</MenuItem>
            </Select>
            </Stack>
            
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <TextField name="pointer" label="Pointer" type="number" required />
            
            
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:paper-plane-fill" />}
            >
              Send
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Container>
  );
}
