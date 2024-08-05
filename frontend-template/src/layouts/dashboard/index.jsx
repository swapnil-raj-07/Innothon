import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { account } from 'src/_mock/account';

import Nav from './nav';
import Main from './main';
import Header from './header';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const [userAccount, setUserAccount] = useState(account);

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
