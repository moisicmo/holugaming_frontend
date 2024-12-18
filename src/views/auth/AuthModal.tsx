import { Dialog, DialogTitle, Box, Slide } from "@mui/material";
import { useState } from "react";
import { InitSession } from "./InitSession";
import { Register } from "./Register";
import { Validation } from "./Validation";
import { ChangePwd } from "./ChangePwd";

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const AuthModal = (props: Props) => {
  const { open, handleClose } = props;
  const [value, setValue] = useState(1);
  const [email, setEmail] = useState<String>();
  const [code, setCode] = useState<String>();

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  const handleValidate = (email: String) => {
    setEmail(email)
    handleChange(3);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      {value === 1 && (
        <Slide direction="right" in={value === 1} mountOnEnter unmountOnExit>
          <Box p={3}>
            <DialogTitle>{'Inicio de sesión'}</DialogTitle>
            <InitSession createAccount={() => handleChange(2)} cancel={() => handleClose()} validateEmail={(v) => handleValidate(v)} />
          </Box>
        </Slide>
      )}
      {value === 2 && (
        <Slide direction="left" in={value === 2} mountOnEnter unmountOnExit>
          <Box p={3}>
            <DialogTitle>{'Crear cuenta'}</DialogTitle>
            <Register initSesion={() => handleChange(1)} cancel={() => handleClose()} />
          </Box>
        </Slide>
      )}
      {value === 3 && email && (
        <Slide direction="left" in={value === 3} mountOnEnter unmountOnExit>
          <Box p={3}>
            <DialogTitle>{'Validación de la cuenta'}</DialogTitle>
            <Validation email={email} changePwd={(code) => {
              handleChange(4);
              setCode(code)
            }} cancel={() => handleClose()} />
          </Box>
        </Slide>
      )}
      {value === 4 && code && email && (
        <Slide direction="left" in={value === 4} mountOnEnter unmountOnExit>
          <Box p={3}>
            <DialogTitle>{'Crear contraseña'}</DialogTitle>
            <ChangePwd code={code} email={email} initSesion={() => handleChange(1)} cancel={() => handleClose()} />
          </Box>
        </Slide>
      )}
    </Dialog>
  );
};
