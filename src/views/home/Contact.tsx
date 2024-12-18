import { ComponentInput } from "@/components";
import { useForm } from "@/hooks";
import { FormContactModel, FormContactValidations } from "@/models";
import { Button, Grid, Typography } from "@mui/material";
import { FormEvent, useState } from "react";

const formFields: FormContactModel = {
  name: '',
  email: '',
  message: '',
}

const formValidations: FormContactValidations = {
  name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
  email: [(value: string) => value.length >= 1, 'Debe ingresar su correo'],
  message: [(value: string) => value.length >= 1, 'Debe ingresar un mensaje'],
}

export const Contact = () => {


  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    name, email, message,
    onInputChange, isFormValid,
    nameValid, emailValid, messageValid, onResetForm } = useForm(formFields, formValidations);

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;

    onResetForm();
  }


  return (
    <div style={{ paddingInline: '2rem',paddingBlock:'5rem' }} >
    <Typography variant="h4" gutterBottom align="center" paddingBottom={5} >
      Contactanos
    </Typography>
      <form onSubmit={sendSubmit}>
        <Grid container sx={{py:'10px'}}>
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
              label="Email"
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={formSubmitted ? emailValid : ''}
            />
          </Grid>
          <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
            <ComponentInput 
              name="message"
              value={message}
              onChange={onInputChange}
              label="Mensaje"
              isWide={true}
              error={!!messageValid && formSubmitted}
              helperText={formSubmitted ? messageValid : ''}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" size="large" >
          ENVIAR
        </Button>
      </form>

    </div>
  )
}
