import {useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

import Box from '@mui/material/Box';

import { account } from 'src/_mock/account';

import Nav from './nav';
import Main from './main';
import Header from './header';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const [userAccount, setUserAccount] = useState(account);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users?id=1').then((response) => {
      console.log('response.data',response.data[0]);
      const X = {
        displayName: response.data[0].name,
        email: response.data[0].email,
        photoURL: '/assets/images/avatars/avatar_25.jpg',
        isAdmin: true        
      }
      setUserAccount(X);
    });
  },[]);



  

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
