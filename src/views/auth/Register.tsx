import { ComponentButton, ComponentInput } from "@/components";
import { useAuthStore, useForm } from "@/hooks";
import { FormRegisterModel, FormRegisterValidations } from "@/models";
import { DialogActions, DialogContent, Grid, Stack } from "@mui/material";
import { FormEvent, useState } from "react";

interface Props {
  initSesion: () => void;
  cancel: () => void;
}

const formFields: FormRegisterModel = {
  name: '',
  lastName: '',
  nick: '',
  email: '',
};

const formValidations: FormRegisterValidations = {
  name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
  lastName: [(value: string) => value.length >= 1, 'Debe ingresar un apellido'],
  nick: [(value: string) => value.length >= 1, 'Debe ingresar un nick'],
  email: [(value: string) => value.length >= 4, 'Debe ingresar su teléfono'],
};

export const Register = (props: Props) => {

  const { initSesion, cancel } = props;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { register } = useAuthStore();
  const {
    name,
    lastName,
    nick,
    email,
    onInputChange,
    onResetForm,
    nameValid,
    lastNameValid,
    nickValid,
    emailValid,
  } = useForm(formFields, formValidations);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    await register({
      name,
      lastName,
      "typeContact": "EMAIL",
      "data": email,
      nick
    });
    initSesion()
    onResetForm();
  };

  return (
    <>
      <form onSubmit={sendSubmit}>
        <DialogContent
          sx={{
            padding: 0,
            margin: 0,
          }} >
          <Grid container>
            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
              <ComponentInput
                type="text"
                label="Nombre"
                name="name"
                value={name}
                onChange={onInputChange}
                error={!!nameValid && formSubmitted}
                helperText={formSubmitted ? nameValid : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
              <ComponentInput
                type="text"
                label="Apellido"
                name="lastName"
                value={lastName}
                onChange={onInputChange}
                error={!!lastNameValid && formSubmitted}
                helperText={formSubmitted ? lastNameValid : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
              <ComponentInput
                type="text"
                label="Nick"
                name="nick"
                value={nick}
                onChange={onInputChange}
                error={!!nickValid && formSubmitted}
                helperText={formSubmitted ? nickValid : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
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
          </Grid>
          <Stack
            direction="row"
            justifyContent="end"
          >
            <ComponentButton
              variant={'text'}
              text="Ya tengo mi cuenta"
              onClick={() => initSesion()}
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
            text="Registrarse"
            type="submit"
          />
        </DialogActions>
      </form>
    </>
  )
}
