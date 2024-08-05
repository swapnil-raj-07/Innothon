import React, { useState } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


import { posts } from 'src/_mock/blog';

import Iconify from 'src/components/iconify';

import PostCard from '../post-card';

// ----------------------------------------------------------------------

export default function UserDashboardView() {
  const [userPosts, setUserPosts] = useState(posts);

  const handleRadioChange = (event) => {
    if(event.target.value === 'all') setUserPosts(posts);
    if(event.target.value === 'unread') setUserPosts(posts.filter((post) => !post.isRead));
    if(event.target.value === 'read') setUserPosts(posts.filter((post) => post.isRead));
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
            <FormControlLabel value="read" control={<Radio />} label="read" />
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          endIcon={<Iconify icon="eva:award-fill" color="#FFAB00" />}
        >
          300
        </Button>
      </Stack>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        {/* <PostSearch posts={posts} /> */}
        {/* <PostSort
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'popular', label: 'Popular' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        /> */}
      </Stack>

      <Grid container spacing={3}>
        {userPosts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </Container>
  );
}
