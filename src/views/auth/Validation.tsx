import { ComponentButton, ComponentInput } from "@/components";
import { useAuthStore, useForm } from "@/hooks";
import { FormValidationModel, FormValidationValidations } from "@/models";
import { DialogActions, DialogContent, Grid, Typography } from "@mui/material";
import { FormEvent, useState } from "react";

interface Props {
  email: String;
  changePwd: (code:String) => void;
  cancel: () => void;
}

const formFields: FormValidationModel = {
  code: '',
};

const formValidations: FormValidationValidations = {
  code: [(value: string) => value.length >= 1, 'Debe ingresar el código'],
};

export const Validation = (props: Props) => {

  const { email, changePwd, cancel } = props;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { validate } = useAuthStore();
  const {
    code,
    onInputChange,
    onResetForm,
    codeValid
  } = useForm(formFields, formValidations);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    await validate({code,"data":email});
    onResetForm();
    changePwd(code);
  };

  return (
    <>
      <form onSubmit={sendSubmit}>
        <DialogContent
          sx={{
            padding: 0,
            margin: 0,
          }} >
          <Typography>{`Se le envio un código a su correo: ${email}`}</Typography>
          <Grid container>
            <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
              <ComponentInput
                type="text"
                label="Código"
                name="code"
                value={code}
                onChange={onInputChange}
                error={!!codeValid && formSubmitted}
                helperText={formSubmitted ? codeValid : ''}
              />

            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {/* <ComponentButton
            text="Reenviar"
            type="submit"
          /> */}
          <ComponentButton
            text="Cancelar"
            onClick={() => {
              onResetForm();
              cancel();
            }}
          />
          <ComponentButton
            text="Validar"
            type="submit"
          />
        </DialogActions>
      </form>
    </>
  )
}
