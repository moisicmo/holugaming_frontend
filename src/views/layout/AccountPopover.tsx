
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, useLogoutStore } from '@/hooks';

export const AccountPopover = ({ anchorEl, onClose, open, onTapSettings }: { anchorEl: any, onClose: any, open: boolean, onTapSettings: any }) => {

  const navigate = useNavigate();
  const { startLogout } = useLogoutStore();
  const { user } = useAuthStore();

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Cuenta
        </Typography>
        {user && <Typography
          color="text.secondary"
          variant="body2"
        >
          {user}
        </Typography>}
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={() => onTapSettings()} >
          Configuraciones
        </MenuItem>
        <MenuItem
          onClick={() => {
            startLogout();
            navigate('/');
          }}
        >
          Salir Sesión
        </MenuItem>
      </MenuList>
    </Popover>
  );
};