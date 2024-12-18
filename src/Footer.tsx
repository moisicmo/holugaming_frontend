import { Box, Grid, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import logo from '@/assets/images/holu.svg';
// import SocialLinks from "./SocialLinks"; // Asegúrate de tener un componente para redes sociales

const pages = [
  { name: 'Acerca de nosotros', url: '/about' },
  { name: 'Contactanos', url: '/contact' },
  { name: 'Torneos', url: '/tournaments' },
];

const Footer = () => {
  return (
    <Box component="footer" sx={{ padding: "40px 20px", zIndex:999 }}>
      <Grid container spacing={4}>
        {/* Sección 1: Logo y Descripción */}
        <Grid item xs={12} md={3}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src={logo} alt="Logo" style={{ maxWidth: "150px" }} />
            <Typography variant="body2" sx={{ textAlign: "center", marginTop: 2 }}>
              La gloria es efímera, pero el sacrificio es eterno.
            </Typography>
            
          </Box>
        </Grid>

        {/* Sección 2: Enlaces de Navegación */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Compañía</Typography>
          <Box>
            {pages.map((link, index) => (
              <Button key={index} component={Link} to={link.url} sx={{ display: "block", padding: "4px 0" }}>
                {link.name}
              </Button>
            ))}
          </Box>
        </Grid>

        {/* Sección 3: Información de Contacto */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Alo Holu?</Typography>
          <Typography variant="body2">Necesitas ayuda?</Typography>
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body2">Telefono: <a href="tel:+59173735766">+591 73735766</a></Typography>
            <Typography variant="body2">Correo: <a href="mailto:moisic.mo@gmail.com">moisic.mo@gmail.com</a></Typography>
          </Box>
        </Grid>

        {/* Sección 4: Información de Derechos de Autor */}
        <Grid item xs={12} md={3}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="body2" sx={{ textAlign: "center" }}>
              © 2024 Holu. All rights reserved.
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              {/* <SocialLinks /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
