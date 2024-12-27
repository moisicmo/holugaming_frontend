
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuthStore, useLogoutStore } from '@/hooks';

interface Props {
  anchorEl: any,
  onClose: ()=>void,
  open: boolean,
  onTapSettings: ()=>void,
}

export const AccountPopover = (props: Props) => {

  const { anchorEl, onClose, open, onTapSettings } = props;

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
           {user.name} {user.lastName}
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
          Mi Perfil
        </MenuItem>
        <MenuItem onClick={() => {
          startLogout()
          onClose()
          }} >
          Salir Sesión
        </MenuItem>
      </MenuList>
    </Popover>
  );
};