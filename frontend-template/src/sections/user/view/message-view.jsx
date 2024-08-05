import * as React from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function MessagePage() {
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
