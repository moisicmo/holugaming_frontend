import { useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { SideNavItem } from '@/components';
import { menu } from '@/utils/menu';
import logo from '@/assets/images/holu.svg';

export const SideNav = ({ open, onClose }: { open: boolean, onClose: any }) => {


  const { pathname } = useLocation();
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const content = (
    <Box component="nav" >
      <Stack
        sx={{
          listStyle: 'none',
          px: 1,
          py: 3
        }}
        justifyContent="center" alignItems="center"
      >
        <img src={logo} alt="logo" style={{  width: '100px'  }} />
        <div style={{ height: 10 }} />
        {menu().map((item) => (
          <Box
            key={item.title}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            {
              item.path ?
                <SideNavItem
                  active={item.path ? (pathname === item.path) : false}
                  icon={item.icon}
                  path={item.path}
                  title={item.title}
                /> :
                <>
                  <Typography
                    color="inherit"
                    variant="subtitle1"
                  >
                    {item.title}
                  </Typography>
                  {
                    item.group!.map((element: any) => {
                      const active = element.path ? (pathname === element.path) : false;
                      return (
                        <SideNavItem
                          key={element.title}
                          active={active}
                          // disabled={element.disabled}
                          icon={element.icon}
                          path={element.path}
                          title={element.title}
                        />
                      );
                    })
                  }
                </>
            }
          </Box>
        ))}
      </Stack>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            color: '#9ca6be',
            width: 190
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          color: '#9ca6be',
          width: 190
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
