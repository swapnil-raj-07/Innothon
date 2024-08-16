import PropTypes from 'prop-types';
import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';

import Iconify from 'src/components/iconify';

import AccountPopover from './common/account-popover';
import { HEADER, NAV } from './config-layout';

export default function Header({ onOpenNav, userDetails }) {
  const theme = useTheme();
  const lgUp = useResponsive('up', 'lg');

  // State for handling dialog visibility and selected redeem option
  const [open, setOpen] = useState(false);
  const [redeemOption, setRedeemOption] = useState(null);

  // Points available
  const points = 2500; // Replace this with dynamic points if available

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRedeemOption(null);
  };

  const handleRedeem = (option) => {
    if (option === 'lunch' && points >= 2500) {
      alert('Redeeming Lunch Coupon!');
    } else if (option === 'mug' && points >= 10000) {
      alert('Redeeming Coffee Mug!');
    } else if (option === 'bottle' && points >= 15000) {
      alert('Redeeming Water Bottle!');
    } else {
      alert('Not enough points!');
    }
    handleClose();
  };

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="h4" color="black">
          Hi 👋, {userDetails.displayName.toString().split(' ')[0]}
        </Typography>

        {/* Points Button */}
        <Box onClick={handleClickOpen} sx={{ cursor: 'pointer', padding: '10px' }}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Iconify icon="mdi:coin" width={24} height={24} color="gold" />
            <Typography variant="h6" color="darkseagreen">
              {points} Points
            </Typography>
          </Stack>
        </Box>
      </Stack>

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <>
      <AppBar
        sx={{
          boxShadow: 'none',
          height: HEADER.H_MOBILE,
          zIndex: theme.zIndex.appBar + 1,
          ...bgBlur({
            color: theme.palette.background.default,
          }),
          transition: theme.transitions.create(['height'], {
            duration: theme.transitions.duration.shorter,
          }),
          ...(lgUp && {
            width: `calc(100% - ${NAV.WIDTH + 1}px)`,
            height: HEADER.H_DESKTOP,
          }),
        }}
      >
        <Toolbar
          sx={{
            height: 1,
            px: { lg: 5 },
          }}
        >
          {renderContent}
        </Toolbar>
      </AppBar>

      {/* Redeem Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Redeem Points</DialogTitle>
        <DialogContent>
          <Typography>Choose an option to redeem your points:</Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              onClick={() => handleRedeem('lunch')}
              disabled={points < 2500}
            >
              Lunch Coupon (2500 Points)
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleRedeem('mug')}
              disabled={points < 10000}
            >
              Coffee Mug (10000 Points)
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleRedeem('bottle')}
              disabled={points < 15000}
            >
              Water Bottle (15000 Points)
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
  userDetails: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
  }),
};
