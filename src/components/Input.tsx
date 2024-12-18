import { TextField } from "@mui/material";
import { memo } from "react";

export const ComponentInput = memo((
  {
    id,
    name,
    value,
    onChange,
    type = "text",
    label,
    endAdornment = null,
    isWide = false, // Nuevo prop
    error = false,
    helperText = '',
    sx,
  }:
    {
      id?: string,
      name: string,
      value: any,
      onChange?: any,
      type?: string,
      label: string,
      endAdornment?: any,
      isWide?: boolean, // Nuevo prop para definir si es más amplio
      error?: boolean,
      helperText?: string,
      sx?: any,
    }) => {
  return (
    <TextField
      id={id}
      type={type}
      multiline={isWide} // Cambia automáticamente según el prop
      rows={isWide ? 4 : 1} // Define el número de filas si es más amplio
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      autoComplete='off'
      style={{ width: '100%' }}
      error={error}
      helperText={helperText}
      InputProps={{
        endAdornment,
        style: {
          color: 'white',
          height: isWide ? 'auto' : '50px', // Ajusta la altura si es más amplio
          borderColor: '#0B815A',
        },
      }}
      sx={{
        padding: '2px',
        margin: '0px',
        '& label.Mui-focused': {
          color: 'white',
        },
        '& label:not(.Mui-focused)': {
          color: 'white',
        },
        '& .MuiOutlinedInput-root': {
          borderRadius: '10px',
          height: isWide ? 'auto' : 'fit-content', // Cambia la altura
          '& fieldset': { borderColor: '#2F3746' },
        },
        ...sx,
      }}
    />
  );
});
