import { Button } from '@mui/material'

interface buttonProps {
  type?: any,
  text?: any,
  onClick?: any,
  width?: any,
  startIcon?: any,
  margin?: any,
  height?: any,
  disable?: boolean,
  variant?: any,
  maxWidth?: any,
  minWidth?: any,
  sx?:any
}
export const ComponentButton = (props: buttonProps) => {
  const {
    type,
    text,
    onClick,
    width,
    startIcon,
    disable,
    margin,
    height,
    variant = 'contained',
    maxWidth,
    minWidth,
    sx,
  } = props;
  return (
    <Button
      type={type}
      className='mt-2'
      variant={variant}
      disableElevation
      disableRipple
      disabled={disable}
      startIcon={text == null ? null : startIcon}
      onClick={onClick}
      sx={{
        fontWeight: 'bold',
        margin: { margin },
        width: { width },
        maxWidth: { maxWidth },
        minWidth: { minWidth },
        height: { height },
        ...sx,
      }}
    >
      {text == null ? startIcon : text}
    </Button>
  )
};