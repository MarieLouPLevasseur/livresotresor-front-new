import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../../assets/img/themes/main/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';

import { userLogout } from '../../Utils/Slices/login/userSlice';
import { kidLogout } from '../../Utils/Slices/login/kidSlice';

import './Navbar.scss';

const pages = [
  {name:"Tutoriel", path: "/tutoriel"},
  {name:"S'inscrire", path: "/inscription"},
  {name:"Enfant", path:"/connexion-enfant"},
  {name:"Parents", path:"/connexion-parent"},
];

const userSettings = [
  {name:'Profil', path:"/profil/utilisateur"},
  {name:'Compte', path:"/profil/utilisateur/compte"},
];

const kidSettings = [
  {name:'Ma page', path:"/profil/enfant"},
  {name:'Mes livres', path:"/mes-livres"},

];

const Navbar = () => {
  const isLogUser = useSelector((state) => state.user.isLogUser)
  const isLogKid = useSelector ((state => state.kid.isLogKid))

  const isLog = isLogUser || isLogKid;

  const dispatch = useDispatch()

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(false);
  const anchorElNavRef = useRef(null);

  const handleOpenNavMenu = (event) => {
    // setAnchorElNav(true);
    // setAnchorElNav(anchorElNavRef.current);
    setAnchorElNav(anchorElNavRef.current.getBoundingClientRect());

  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(true);
  };

  const handleCloseNavMenu = () => {
    // setAnchorElNav(false);
    setAnchorElNav(null);

  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(false);
  };

  const handleLogout = () => {
    handleCloseNavMenu();
    dispatch(userLogout());
    dispatch(kidLogout())
    localStorage.removeItem('user');
    localStorage.removeItem('kid');
  };
  
  return (
    <AppBar className='nav' position="static">
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <Link to="/" style={{ textDecoration: 'none', color:'white'}}>
            <Box component="img" sx={{ display: { xs: 'none', md: 'flex' }, mr: 2, ml: 10 }} src={Logo} className="app-logo" alt="logo"/>          
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              sx={{ mr: 10 }}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              // ref={anchorElNavRef}

            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <Link to={page.path} key={page.name} style={{ textDecoration: 'none', color: 'black'}}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          <Box>
            <Link to='/'>
            <Box component="img" sx={{ display: { xs: 'block', md: 'none' }, justifyContent: 'center' ,mr: 1 }} src={Logo} className="app-logo" alt="logo" />
            </Link>
          </Box>
          </Box>
          {!isLog && (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'flex-end' }}}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 3, color: 'white',fontFamily:'Montserrat', display: 'block', mr: 2 }}
              >
                <NavLink
                  className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
                  style={{ textDecoration: 'none'}}
                  to='/tutoriel'
                >
                  Tutoriel
                </NavLink>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 3, color: 'white',fontFamily:'Montserrat', display: 'block', mr: 2 }}
              >
                <NavLink
                  className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
                  style={{ textDecoration: 'none'}}
                  to='/inscription'
                >
                  S'inscrire
                </NavLink>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 3, color: 'white',fontFamily:'Montserrat', display: 'block', mr: 2 }}
              >
                <NavLink
                  className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
                  style={{ textDecoration: 'none'}}
                  to='/connexion-enfant'
                >
                  Enfant
                </NavLink>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 3, color: 'white',fontFamily:'Montserrat', display: 'block', mr: 2 }}
              >
                <NavLink
                  className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
                  style={{ textDecoration: 'none'}}
                  to='/connexion-parent'
                >
                  Parent
                </NavLink>
              </Button>
            </Box>
          )}

          {isLog && (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'flex-end'}, mr: 5}}>
              <Button
                className='button'
                onClick={handleCloseNavMenu}
                sx={{ my: 3, color: 'white',fontFamily:'Montserrat', display: 'block'}}
              >
                <NavLink
                  className={({ isActive }) => (isActive ? 'button button--active' : 'button')}
                  style={{ textDecoration: 'none'}}
                  to='/tutoriel'
                >
                  Tutoriel
                </NavLink>
              </Button>
            </Box>
          )}

          {isLog && (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isLogUser &&(userSettings.map((setting) => (
                <Link to={setting.path} key={setting.name} style={{ textDecoration: 'none', color: 'black'}}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                </Link>
              )))} 
              {isLogKid &&(kidSettings.map((setting) => (
                <Link to={setting.path} key={setting.name} style={{ textDecoration: 'none', color: 'black'}}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                </Link>
              )))}              
              <Link to="/" style={{ textDecoration: 'none', color: 'black'}}>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Déconnexion</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
