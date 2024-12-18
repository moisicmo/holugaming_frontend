import { common } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';
import { error, indigo, black, info, neutral, success, warning } from './colors';

import { PaletteOptions } from "@mui/material/styles/createPalette";

export const createPalette = (): PaletteOptions => {
  return {
    action: {
      active: neutral[500],
      disabled: alpha(neutral[900], 0.38),
      disabledBackground: alpha(neutral[900], 0.12),
      focus: alpha(neutral[900], 0.16),
      hover: alpha(neutral[900], 0.04),
      selected: alpha(neutral[900], 0.12)
    },
    background: {
      default: common.black,
      paper: common.black,
    },
    divider: '#F2F4F7',
    error,
    info,
    mode: 'light',
    primary: indigo,
    secondary: black,
    success,
    text: {
      primary: neutral[50],
      secondary: neutral[500],
      disabled: alpha(neutral[900], 0.38)
    },
    warning,
  };
}
