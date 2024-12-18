import { useEffect, useState } from "react";
import slider_img_1 from "@/assets/images/hero/hero01.png";
import slider_img_2 from "@/assets/images/hero/hero02.png";
import slider_img_3 from "@/assets/images/hero/hero03.png";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Banner = () => {
  const images = [slider_img_1, slider_img_2, slider_img_3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      <Grid container sx={{ height: "100%" }}>
        {/* Columna de texto (izquierda) */}
        <Grid item xs={12} sm={4} sx={{ padding: '20px', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
          <div>
            <Typography variant="h6" paragraph>
              Are you Ready?
            </Typography>
            <Typography variant="h2" paragraph>
              Torneo <br /> Dota 1
            </Typography>
            <Link to="/tournaments" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" size="large">
                Registrarse ahora
              </Button>
            </Link>
          </div>
        </Grid>

        {/* Columna de imágenes (derecha) */}
        <Grid item xs={12} sm={8} sx={{ position: "relative", overflow: "hidden", height: "calc(100vh - 80px)" }}>
          {/* Usamos calc(100vh - 80px) para que el Banner ocupe todo el espacio de la pantalla menos la altura del Footer */}
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: currentIndex === index ? 1 : 0,
                transition: "opacity 1.5s ease-in-out", // Difuminado entre cambios
                zIndex: currentIndex === index ? 0 : -1, // Control de superposición de las imágenes
              }}
            />
          ))}
        </Grid>

      </Grid>
    </div>
  );
};
