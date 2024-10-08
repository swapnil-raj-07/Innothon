import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { grey } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

import { useData } from '../../dataContext';

// ----------------------------------------------------------------------

export default function PostCard({ post, index, isDetailView = false }) {
  const { cover, title, desc, isRead, author, createdAt, pointer } = post;
  const navigate = useNavigate();

  const { user } = useData();

  const handleCardClick = () => {
    if (!isDetailView) {
      navigate(`/user/${user.id}/post/${post.id}`);
    }
  };

  const latestPostLarge = index === 0 || index === 1;

  const latestPost = index === 1 || index === 2;

  const renderAvatar = (
    <Avatar
      alt={author.name}
      src={author.avatarUrl}
      sx={{
        bgcolor: grey[900],
        zIndex: 9,
        width: 32,
        height: 32,
        position: 'absolute',
        left: (theme) => theme.spacing(3),
        bottom: (theme) => theme.spacing(-2),
        ...((latestPostLarge || latestPost) && {
          zIndex: 9,
          top: 24,
          left: 24,
          width: 40,
          height: 40,
        }),
      }}
    />
  );

  const renderTitle = (
    <Typography
      color="inherit"
      variant="subtitle2"
      sx={{
        height: 44,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        ...(latestPostLarge && { typography: 'h5', height: 60 }),
        ...((latestPostLarge || latestPost || isDetailView) && {
          color: 'common.white',
        }),
      }}
    >
      {title}
    </Typography>
  );

  const renderDesc = isDetailView && (
    <Typography
      color="inherit"
      variant="body1"
      sx={{
        mt: 2,
        color: 'common.white',
        zIndex: 10,
      }}
    >
      {desc}
    </Typography>
  );

  const renderInfo = (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={1.5}
      justifyContent="flex-end"
      sx={{
        mt: 3,
        color: 'text.disabled',
      }}
    >
      {[
        { number: Number(pointer) / 2, icon: 'eva:clock-fill' },
        { number: pointer, icon: 'eva:award-fill' },
      ].map((info, _index) => (
        <Stack
          key={_index}
          direction="row"
          sx={{
            ...((latestPostLarge || latestPost || isDetailView) && {
              opacity: 0.48,
              color: 'common.white',
            }),
          }}
        >
          <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />
          <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
        </Stack>
      ))}
    </Stack>
  );

  const renderCover = (
    <Box
      component="img"
      alt={title}
      src={cover}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        color: 'text.disabled',
        ...((latestPostLarge || latestPost || isDetailView) && {
          opacity: 0.48,
          color: 'common.white',
        }),
      }}
    >
      {fDate(createdAt)}
    </Typography>
  );

  const renderShape = (
    <SvgColor
      color="paper"
      src="/assets/icons/shape-avatar.svg"
      sx={{
        width: 80,
        height: 36,
        zIndex: 9,
        bottom: -15,
        position: 'absolute',
        color: 'background.paper',
        ...((latestPostLarge || latestPost) && { display: 'none' }),
      }}
    />
  );

  return (
    <Grid xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card onClick={handleCardClick} style={{ cursor: isDetailView ? 'default' : 'pointer' }}>
        <Label
          variant="filled"
          color="error"
          sx={{
            zIndex: 9,
            top: 16,
            right: 16,
            position: 'absolute',
            textTransform: 'uppercase',
            display: isRead ? 'none' : 'inline-flex',
          }}
        >
          unread
        </Label>
        <Box
          sx={{
            position: 'relative',
            pt: isDetailView ? 'calc(100% * 2 / 3)' : 'calc(100% * 3 / 4)',
            ...((latestPostLarge || latestPost || isDetailView) && {
              pt: isDetailView ? 'calc(100% * 3 / 2)' : 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)',
              },
            }),
          }}
        >
          {renderShape}

          {renderAvatar}

          {renderCover}
        </Box>

        <Box
          sx={{
            p: (theme) => theme.spacing(4, 3, 3, 3),
            ...((latestPostLarge || latestPost || isDetailView) && {
              width: 1,
              bottom: 0,
              position: 'absolute',
            }),
          }}
        >
          {renderDate}

          {renderTitle}

          {renderDesc}

          {renderInfo}
        </Box>
      </Card>
    </Grid>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
  isDetailView: PropTypes.bool,
};
