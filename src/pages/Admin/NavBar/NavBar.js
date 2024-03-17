import * as React from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { NavLink } from "react-router-dom";

import './NavBar.scss';

function NavBar() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: '80%', margin: 'auto' }}>
      <Button
        className='button'
        sx={{ my: 2, fontFamily: 'Montserrat', minWidth: '200px' }}
      >
        <NavLink
          className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
          style={{ textDecoration: 'none' }}
          to='/admin/index'
        >
         Index
        </NavLink>
      </Button>
      <Button
        className='button'
        sx={{ my: 2, fontFamily: 'Montserrat', minWidth: '200px' }}
      >
        <NavLink
          className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
          style={{ textDecoration: 'none' }}
          to='/admin/diplomes/index'
        >
          Diplomes
        </NavLink>
      </Button>
      <Button
        className='button'
        sx={{ my: 2, fontFamily: 'Montserrat', minWidth: '200px' }}
      >
        <NavLink
          className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
          style={{ textDecoration: 'none' }}
          to='/admin/avatars/index'
        >
          Avatars
        </NavLink>
      </Button>
      <Button
        className='button'
        sx={{ my: 2, fontFamily: 'Montserrat', minWidth: '200px' }}
      >
        <NavLink
          className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
          style={{ textDecoration: 'none' }}
          to='/admin/utilisateurs/index'
        >
          Utilisateurs
        </NavLink>
      </Button>
    </Box>
  );
}

export default NavBar;
