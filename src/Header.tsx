import * as React from 'react';
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
import { AuthModal } from './views/auth/AuthModal';

const pages = [
  { name: 'Acerca de nosotros', url: '/about' },
  { name: 'Contactanos', url: '/contact' },
  { name: 'Torneos', url: '/tournaments' },
];

export const Header = () => {

  const [openDialog, setOpenDialog] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [scrolled, setScrolled] = React.useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  React.useEffect(() => {
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
            <Box sx={{ flexGrow: 0 }}>
              <Button onClick={() => setOpenDialog(true)} variant="contained" color="primary" size="large">iniciar Sesión</Button>
              {/* <IconButton sx={{ p: 0 }}>
                <Avatar src="/broken-image.jpg" />
              </IconButton> */}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {openDialog && (
        <AuthModal
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
        />
      )}
    </>
  );
};
