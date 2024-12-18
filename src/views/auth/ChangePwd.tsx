import { ComponentButton, ComponentInput } from '@/components';
import { useAuthStore, useForm } from '@/hooks';
import { FormPasswordModel, FormPasswordValidations } from '@/models';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DialogActions, DialogContent, Grid, IconButton, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';

interface Props {
  code: String;
  email: String;
  initSesion: () => void;
  cancel: () => void;
}
const formFields: FormPasswordModel = {
  password: '',
  passwordVerify: '',
};


export const ChangePwd = (props: Props) => {
  const { code, email, initSesion, cancel } = props;
  const formValidations: FormPasswordValidations = {
  password: [
    (value: string) => value.length >= 6, // Debe tener al menos 6 caracteres
    'Debe ingresar una contraseña de al menos 6 caracteres',
  ],
  passwordVerify: [
    (value: string) => value === password, // Las contraseñas deben coincidir
    'La contraseña debe ser idéntica',
  ],
};

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { changePassword } = useAuthStore();
  const {
    password,
    passwordVerify,
    onInputChange,
    isFormValid,
    onResetForm,
    passwordValid,
    passwordVerifyValid,
  } = useForm(formFields, formValidations);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    await changePassword({
      code,
      "data": email,
      "newPassword": password,
    });
    initSesion();
  };


  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const [showPasswordVerify, setShowPasswordVerify] = useState(false);
  const handleTogglePasswordVerifyVisibility = () => {
    setShowPasswordVerify(!showPasswordVerify);
  };

  return (
    <>
      <form onSubmit={sendSubmit}>
        <DialogContent >
          <Typography>
            Ya es el ultimo paso!! agrega una contraseña
          </Typography>
          <Grid container>
            <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
              <ComponentInput
                type={showPassword ? 'text' : 'password'}
                label="Contraseña"
                name="password"
                value={password}
                onChange={onInputChange}
                endAdornment={(
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )}
                error={!!passwordValid && formSubmitted}
                helperText={formSubmitted ? passwordValid : ''}
              />
            </Grid>
            <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
              <ComponentInput
                type={showPasswordVerify ? 'text' : 'password'}
                label="Repetir contraseña"
                name="passwordVerify"
                value={passwordVerify}
                onChange={onInputChange}
                endAdornment={(
                  <IconButton onClick={handleTogglePasswordVerifyVisibility} edge="end">
                    {showPasswordVerify ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )}
                error={!!passwordVerifyValid && formSubmitted}
                helperText={formSubmitted ? passwordVerifyValid : ''}
              />
            </Grid>
          </Grid>

        </DialogContent>
        <DialogActions>
          <ComponentButton
            text="Cancelar"
            onClick={() => {
              onResetForm();
              cancel();
            }}
          />
          <ComponentButton
            text="Guardar contraseña"
            type="submit"
          />
        </DialogActions>
      </form>
    </>
  )
}
