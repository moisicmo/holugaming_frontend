import Accordion, {
  AccordionSlots,
  accordionClasses,
} from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails, {
  accordionDetailsClasses,
} from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import { useState, useEffect } from 'react';
import { ExpandMore } from '@mui/icons-material';
import { CardMedia, Box, Grid } from '@mui/material';
import slider_img_1 from "@/assets/images/poster01.jpeg";
import { useNavigate } from 'react-router-dom';
import { useTournamentStore } from '@/hooks';
import { TournamentModel } from '@/models';
import { ComponentButton } from '@/components';

export const TournamentHome = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const { tournaments, getTournaments } = useTournamentStore();

  useEffect(() => {
    getTournaments()
  }, [])


  // const [timeLeft, setTimeLeft] = useState({
  //   days: 0,
  //   hours: 0,
  //   minutes: 0,
  //   seconds: 0,
  // });


  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  // useEffect(() => {
  //   const targetDate = new Date('2024-12-28T00:00:00'); // Fecha objetivo
  //   const interval = setInterval(() => {
  //     const now = new Date();
  //     const difference = targetDate.getTime() - now.getTime();

  //     if (difference <= 0) {
  //       clearInterval(interval);
  //       setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  //     } else {
  //       const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  //       const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  //       const minutes = Math.floor((difference / (1000 * 60)) % 60);
  //       const seconds = Math.floor((difference / 1000) % 60);
  //       setTimeLeft({ days, hours, minutes, seconds });
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom align="center" paddingBottom={5}>
        Nuestros Torneos
      </Typography>
      {
        tournaments.map((tournament: TournamentModel) => {
          return <Accordion
            key={tournament.id}
            expanded={expanded}
            onChange={handleExpansion}
            slots={{ transition: Fade as AccordionSlots['transition'] }}
            slotProps={{ transition: { timeout: 400 } }}
            sx={[
              expanded
                ? {
                  [`& .${accordionClasses.region}`]: {
                    height: 'auto',
                  },
                  [`& .${accordionDetailsClasses.root}`]: {
                    display: 'block',
                  },
                }
                : {
                  [`& .${accordionClasses.region}`]: {
                    height: 0,
                  },
                  [`& .${accordionDetailsClasses.root}`]: {
                    display: 'none',
                  },
                },
            ]}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >

              <Grid container sx={{
                flex: 1,
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // marginLeft: 2,
              }}>
                <Grid item xs={12} sm={3}>
                  <CardMedia
                    component="img"
                    sx={{ width: 200 }}
                    image={slider_img_1}
                    alt="Live from space album cover"
                  />
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Typography>
                    {tournament.name}
                  </Typography>
                  <Typography>
                    🔥👾 Si eres fan del clásico #DOTA1 y tienes a tu equipo, puedes ganar Bs 1000 de premio en efectivo.
                  </Typography>
                </Grid>
              </Grid>

              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                }}
              >
                {/* <Typography variant="caption">
                  Faltan: {timeLeft.days}días, {timeLeft.hours}horas, {timeLeft.minutes}minutos{' '}
                </Typography> */}
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                ¡Participa del Torneo Holu! <br />
                📌Modalidad: Online <br />
                📌Fechas: 28 y 29 de diciembre <br />
                📌Requisitos: Ser mayor de edad. <br />
                📌Costo de inscripción: Bs 25 por equipo <br />
                <br />
                Estructura del torneo: <br />
                💥Recibiremos la inscripción de 16 equipos. <br />
                💥Cada equipo debe estar conformado por 5 jugadores y 2 suplentes
                (los suplentes son opcionales). <br />
                💥Formato de Simple eliminación Bo1 hasta cuartos de final. <br />
                Semifinales y Finales Bo3. <br />
                💥El torneo es online. <br />
                💥Los equipos pueden participar desde cualquier ciudad. <br />
              </Typography>
              <ComponentButton variant="contained" onClick={() => navigate(`/tournament/${tournament.id}`)} text='Entrar al torneo' />

            </AccordionDetails>
          </Accordion>

        })
      }
    </div>
  );
};
