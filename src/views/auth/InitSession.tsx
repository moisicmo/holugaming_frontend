import { ComponentButton, ComponentInput } from "@/components";
import { useAuthStore, useForm } from "@/hooks";
import { FormAuthModel, FormAuthValidations } from "@/models";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DialogActions, DialogContent, Grid, IconButton, Stack, Typography } from "@mui/material";
import { FormEvent, useState } from "react";


interface Props {
  createAccount: () => void;
  cancel: () => void;
  validateEmail: (value:String) => void;
}

const formFields: FormAuthModel = {
  email: '',
  password: '',
};

const formValidations: FormAuthValidations = {
  email: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
  password: [(value: string) => value.length >= 1, 'Debe ingresar una contraseña'],
};

export const InitSession = (props: Props) => {
  const { createAccount, cancel, validateEmail } = props;
  const { startLogin } = useAuthStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const {
    email,
    password,
    onInputChange,
    isFormValid,
    onResetForm,
    emailValid,
    passwordValid,
  } = useForm(formFields, formValidations);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    const value = await startLogin({ "typeContact":"EMAIL","data":email, password });
    console.log(value)
    if(value.statusCode === 1 ){
      validateEmail(email);
    }
    // handleClose();
    // onResetForm();
  };
  return (
    <>
      <form onSubmit={sendSubmit}>
        <DialogContent >
          <Grid container>
            <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
              <ComponentInput
                type="email"
                label="Correo"
                name="email"
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmitted}
                helperText={formSubmitted ? emailValid : ''}
              />
            </Grid>
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
          </Grid>
          <Stack
            direction="row"
            justifyContent="space-between"
          >
            <Typography>
              Aún no tienes cuenta?
            </Typography>
            <ComponentButton
              variant={'text'}
              text="Crear cuenta"
              onClick={() => createAccount()}
            />
          </Stack>
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
            text="Iniciar Sesión"
            type="submit"
          />
        </DialogActions>
      </form>
    </>
  )
}
