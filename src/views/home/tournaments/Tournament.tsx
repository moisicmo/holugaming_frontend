import { Button, Card, CardActions, CardContent, Grid, Typography, Avatar, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

export const Tournament = () => {
  const { gameName } = useParams();
  const navigate = useNavigate();

  if (gameName !== 'dota1') {
    navigate('/404', { replace: true });
    return null;
  }

  const teams = Array.from({ length: 16 }, (_, index) => `EQUIPO ${index + 1}`);
  const users = Array.from({ length: 20 }, (_, index) => `/broken-image-${index + 1}.jpg`);

  return (
    <div style={{ padding: '4rem' }}>
      <Typography variant="h4" gutterBottom align="center" paddingBottom={5}>
        Torneo HOLU - DOTA 1
      </Typography>

      <Typography gutterBottom align="center" variant="h5">
        Equipos disponibles
      </Typography>

      <Grid container spacing={2}>
        {teams.map((team, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}> 
            <Card
              sx={{
                backgroundColor: '#f2f2f2',
                height: '100%',
                transition: 'transform 0.3s ease', // Transición suave
                '&:hover': {
                  transform: 'scale(0.95)', // Efecto de encogimiento al hacer hover
                },
              }}
            >
              <CardContent>
                <Typography gutterBottom sx={{ fontSize: 14 }}>
                  {team}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Equipo inscrito</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography gutterBottom align="center" variant="h5" paddingTop={5}>
        ¿No tienes equipo?
      </Typography>
      <Typography gutterBottom align="center" variant="h5">
        Postula o solicita a alguien para unirte a él
      </Typography>

      {/* Sección de los usuarios */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 2,
          marginTop: 3,
        }}
      >
        {users.map((user, index) => (
          <Avatar
            key={index}
            src={user}
            sx={{
              width: 60,
              height: 60,
              border: '2px solid #fff', // Agregar borde blanco para resaltar el avatar
            }}
          />
        ))}
      </Box>
    </div>
  );
};
