/* eslint-disable react-hooks/rules-of-hooks */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'; // Import Button
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useData } from '../dataContext';

const PostDetail = () => {
  const { id } = useParams();
  const { userNotifications, loading, error, putData, user } = useData();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userNotifications) {
      const foundPost = userNotifications.find((p) => p.id.toString() === id.toString());
      console.log('foundPost', {foundPost})
      setPost(foundPost);
    }
  }, [id, userNotifications]);

  const handleMarkAsRead = async () => {
    if (post) {
      try {
        await putData(`userNotification?notificationId=${post.id}&userId=${user.id}`, {
          isRead: 1,
        });
        navigate(`/user`);
        // setPost((prevPost) => ({ ...prevPost, isRead: true }));
        // eslint-disable-next-line no-shadow
      } catch (error) {
        console.error('Failed to mark as read:', error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${post.cover})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        p: 4,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 10,
          bgcolor: alpha('#000000', 0.5),
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography variant="h3" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {post.desc}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleMarkAsRead}
          disabled={post.isRead==='1'}
        >
          {post.isRead ? 'Read' : 'Mark as Read'}
        </Button>
      </Box>
    </Box>
  );
};

export default PostDetail;
