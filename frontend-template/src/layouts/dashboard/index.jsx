import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import { account } from 'src/_mock/account';

import Nav from './nav';
import Main from './main';
import Header from './header';
import { useData } from '../../dataContext';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const { user, loading, error } = useData();
  const [userAccount, setUserAccount] = useState(account);

  useEffect(() => {
    console.log('dataA in useEffect:', user);
    if (user) {
      setUserAccount({
        displayName: `${user.firstName} ${user.lastName}`,
        email: user.emailId,
        photoURL: '/assets/images/avatars/avatar_25.jpg',
        isAdmin: true  
      });
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} userDetails={userAccount} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav
          openNav={openNav}
          onCloseNav={() => setOpenNav(false)}
          userAccountState={(x) => {
            const X = { ...userAccount, isAdmin: x };
            setUserAccount(X);
          }}
          userAccount={userAccount}
        />

        <Main>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
