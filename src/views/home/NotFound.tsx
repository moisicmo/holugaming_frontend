import { Typography } from "@mui/material"

export const NotFound = () => {
  return (
    <div style={{ padding: '4rem' }}>

      <Typography variant="h4" gutterBottom align="center" paddingBottom={5} >
        Oops! Pagina no encontrada
      </Typography>
      <Typography variant="h4" gutterBottom align="center" paddingBottom={5} >
        "El destino te ha traído aquí... pero esta página no existe."
      </Typography>
    </div>
  )
}
