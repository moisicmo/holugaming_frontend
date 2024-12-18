import { Box, Drawer } from "@mui/material";
import React from "react";

interface navProps {
  open: boolean;
  children:any;
  onClose: (state: boolean) => void;
}

export const CartDrawer = (props: navProps) => {
  const {
    open,
    children,
    onClose,
  } = props;


  const content = (
    <Box sx={{ py: 3 }} >
      {React.Children.map(children, child => {
            return React.cloneElement(child);
          })}
    </Box>
  );
  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'white',
          backdropFilter: 'blur(10px)',
          width: 300,
        },
      }}
      sx={{
        zIndex: (theme) => theme.zIndex.appBar + 100,
      }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
}
