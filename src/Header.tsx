// import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import logo from '@/assets/images/holu.svg';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuthStore, usePopover } from './hooks';
import { useEffect, useState } from 'react';
import { Avatar, Stack } from '@mui/material';
import noimage from '@/assets/images/profile.png';
import { AuthModal } from './views/auth/AuthModal';
import { AccountPopover } from './views/layout';

const pages = [
  { name: 'Acerca de nosotros', url: '/about' },
  { name: 'Contactanos', url: '/contact' },
  { name: 'Torneos', url: '/tournaments' },
];

export const Header = () => {

  const [openDialog, setOpenDialog] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const { status, checkAuthToken } = useAuthStore();
  const accountPopover = usePopover();
  useEffect(() => {
    checkAuthToken();
  }, []);


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        color={scrolled ? 'secondary' : 'transparent'}
        sx={{ boxShadow: 'none', width: '100%', top: 0, left: 0 }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <img src={logo} alt="logo" style={{ width: '100px', paddingLeft: '10px' }} />
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
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
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu} sx={{ textTransform: 'none' }}>
                    <Link to={page.url} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {page.name}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ px: 5, flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none' }}
                >
                  <Link to={page.url} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {page.name}
                  </Link>
                </Button>
              ))}
            </Box>
            {
              status === 'not-authenticated' ?
                <Box sx={{ flexGrow: 0 }}>
                  <Button onClick={() => setOpenDialog(true)} variant="contained" color="primary" size="large">iniciar Sesión</Button>
                </Box>
                :
                <Stack
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                // sx={{
                //   minHeight: TOP_NAV_HEIGHT,
                //   px: 2,
                //   py: 1,
                // }}
                >
                  {/* <Stack alignItems="center" direction="row" spacing={2}>
                    {!lgUp && (
                      <IconButton onClick={onNavOpen}>
                        <MenuOutlined color="primary" />
                      </IconButton>
                    )}
                  </Stack> */}
                  <Stack
                    alignItems="center"
                    spacing={2} direction="row"
                  >
                    <Avatar
                      onClick={accountPopover.handleOpen}
                      ref={accountPopover.anchorRef}
                      sx={{ cursor: 'pointer', width: 45, height: 45 }}
                      src={noimage}
                    />
                  </Stack>
                </Stack>
            }
          </Toolbar>
        </Container>
      </AppBar>
      {accountPopover.open && <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
        onTapSettings={() => accountPopover.handleClose()}
      />}
      {openDialog && (
        <AuthModal
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
        />
      )}
    </>
  );
};
