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
        component={NavLink} // Utiliser NavLink comme composant du bouton
        to='/admin/index'
        sx={{ my: 2, fontFamily: 'Montserrat', minWidth: '200px', textDecoration: 'none', color: 'inherit' }} // Appliquer les styles au bouton
      >
        Index
      </Button>
      <Button
        className='button'
        component={NavLink}
        to='/admin/diplomes/index'
        sx={{ my: 2, fontFamily: 'Montserrat', minWidth: '200px', textDecoration: 'none', color: 'inherit' }}
      >
        Diplomes
      </Button>
      <Button
        className='button'
        component={NavLink}
        to='/admin/avatars/index'
        sx={{ my: 2, fontFamily: 'Montserrat', minWidth: '200px', textDecoration: 'none', color: 'inherit' }}
      >
        Avatars
      </Button>
      <Button
        className='button'
        component={NavLink}
        to='/admin/utilisateurs/index'
        sx={{ my: 2, fontFamily: 'Montserrat', minWidth: '200px', textDecoration: 'none', color: 'inherit' }}
      >
        Utilisateurs
      </Button>
    </Box>
  );
}

export default NavBar;
