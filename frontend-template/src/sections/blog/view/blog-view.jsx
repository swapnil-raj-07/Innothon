import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { useData } from 'src/dataContext';

import PostCard from '../post-card';

// ----------------------------------------------------------------------

export default function UserDashboardView() {
  const { userNotifications } = useData(); // Get userNotifications from the context
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    setUserPosts(userNotifications); // Initialize userPosts with userNotifications
  }, [userNotifications]);

  const handleRadioChange = (event) => {
    if (event.target.value === 'all') setUserPosts(userNotifications);
    if (event.target.value === 'unread')
      setUserPosts(userNotifications.filter((post) => !post.isRead));
    if (event.target.value === 'read')
      setUserPosts(userNotifications.filter((post) => post.isRead));
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <FormControl>
          <RadioGroup
            row
            defaultValue="all"
            name="radio-buttons-group"
            onChange={handleRadioChange}
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel value="unread" control={<Radio />} label="Unread" />
            <FormControlLabel value="read" control={<Radio />} label="Read" />
          </RadioGroup>
        </FormControl>
      </Stack>
      <Grid container spacing={3}>
        {userPosts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </Container>
  );
}
