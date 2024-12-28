import { ComponentButton, ComponentInput } from "@/components";
import { useForm } from "@/hooks";
import { FormTeamModel, FormTeamValidations } from "@/models";
import { DialogActions, DialogContent, Grid } from "@mui/material";
import { FormEvent, useState } from "react";

interface Props {
  nameTeam: (name: string) => void;
  cancel: () => void;
}
const formFields: FormTeamModel = {
  name: ''
};

const formValidations: FormTeamValidations = {
  name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
};

export const Inscription = (props: Props) => {
  const { nameTeam, cancel } = props;
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    name,
    onInputChange,
    isFormValid,
    onResetForm,
    nameValid,
  } = useForm(formFields, formValidations);


  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    nameTeam(name);
    cancel();
    onResetForm();
  };
  return (
    <>
      <form onSubmit={sendSubmit}>
        <DialogContent >
          <Grid container>
            <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
              <ComponentInput
                type="text"
                label="Nombre del equipo"
                name="name"
                value={name}
                onChange={onInputChange}
                error={!!nameValid && formSubmitted}
                helperText={formSubmitted ? nameValid : ''}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <ComponentButton
            text="Atras"
            onClick={() => cancel()}
          />
          <ComponentButton
            text="Inscribir mi equipo"
            type="submit"
          />
        </DialogActions>
      </form>
    </>
  )
}
