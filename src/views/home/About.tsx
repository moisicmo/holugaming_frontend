import { Grid, Typography, Box } from "@mui/material";
import person_01 from "@/assets/images/people/person01.jpeg";
import person_02 from "@/assets/images/people/person02.jpeg";
import person_03 from "@/assets/images/people/person03.jpeg";
import person_04 from "@/assets/images/people/person04.jpeg";

export const About = () => {
  const teamMembers = [
    { image: person_03, name: "Jose Acarapi", description: "Coordinador de torneos" },
    { image: person_01, name: "Ramiro Chambi", description: "Redes Sociales" },
    { image: person_02, name: "Carlos Cahuaya", description: "Marketing" },
    { image: person_04, name: "Moises Ochoa", description: "Desarrollador" },
  ];

  return (
    <div style={{ padding: '4rem' }}>

      <Typography variant="h4" gutterBottom align="center" paddingBottom={5} >
        Acerca de Holu Gaming
      </Typography>

      {/* Sección de Visión */}
      <Grid container spacing={3} paddingY={5}>
        <Grid item xs={12} sm={6} >
          <Typography
            gutterBottom
            align="center"
            variant="h5"
          >
            Nuestra Visión:
          </Typography>
          <Typography gutterBottom align="center" sx={{ fontStyle: 'italic' }}>
            "Convertirnos en la plataforma líder en torneos de videojuegos, donde jugadores, equipos y organizaciones puedan descubrir su potencial, crear recuerdos inolvidables y colaborar en un entorno seguro y accesible. Aspiramos a ser el hogar de la competencia digital global, impulsando el crecimiento del esports y conectando a los mejores talentos del mundo."
          </Typography>
        </Grid>

        {/* Sección de Misión */}
        <Grid item xs={12} sm={6} >
          <Typography
            gutterBottom
            align="center"
            variant="h5"
          >
            Nuestra Misión:
          </Typography>
          <Typography gutterBottom align="center" sx={{ fontStyle: 'italic' }}>
            "En Holu, nuestra misión es crear un espacio único donde los jugadores de todo el mundo puedan conectarse, competir y crecer. A través de torneos organizados, sistemas de clasificación transparentes y una comunidad apasionada, buscamos ofrecer experiencias emocionantes y justas para jugadores de todos los niveles, fomentando el espíritu competitivo y la diversión."
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="h4" gutterBottom align="center" paddingY={5}>
        Nuestro Team
      </Typography>

      {/* Sección de equipo */}
      <Grid container spacing={3} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} container direction="column" justifyContent="center" alignItems="center">
            <Box
              sx={{
                width: 150,
                height: 150,
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: 3,
                marginBottom: '1rem',
              }}
            >
              <img
                src={member.image}
                alt={member.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
            <Typography variant="h6" align="center" mt={2}>
              {member.name}
            </Typography>
            <Typography variant="body2" align="center" color="textSecondary">
              {member.description}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
