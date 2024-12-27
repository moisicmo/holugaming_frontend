import { ComponentButton } from '@/components';
import { useAuthStore, useTournamentStore } from '@/hooks';
import { InscriptionModel } from '@/models';
import { AuthModal } from '@/views/auth/AuthModal';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InscriptionModal } from './inscription/InscriptionModal';

export const Tournament = () => {
  const { gameName } = useParams();
  const { tournament, getTournamentById } = useTournamentStore();
  const { status } = useAuthStore();
  const [opDialogAuth, setOpDialogAuth] = useState(false);
  const [opDialogInscription, setOpDialogInscription] = useState(false);

  useEffect(() => {
    getTournamentById(parseInt(gameName ?? ''));
  }, [])


  const onInscription = () => {
    if (status === 'not-authenticated') {
      setOpDialogAuth(true);
    } else {
      setOpDialogInscription(true);
    }
  }
  return (
    <>
      {
        tournament == null ?
          <></> :
          <>
            <div style={{ padding: '4rem' }}>
              <Typography variant="h4" gutterBottom align="center" paddingBottom={5}>
                Torneo HOLU - DOTA 1
              </Typography>

              <Typography gutterBottom align="center" variant="h5">
                Equipos Inscritos!!!
              </Typography>

              <Grid container spacing={2} sx={{ pb: 3 }}>
                {tournament.inscriptions.map((inscription: InscriptionModel) => (
                  <Grid item xs={12} sm={6} md={3} key={inscription.id}>
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
                          {inscription.team.name}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">{inscription.team.name}</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <ComponentButton variant="contained" onClick={() => onInscription()} text='Inscribir a mi equipo' />
            </div>
            {opDialogAuth && (
              <AuthModal
                open={opDialogAuth}
                handleClose={() => setOpDialogAuth(false)}
              />
            )}
            {
              opDialogInscription && (
                <InscriptionModal
                  open={opDialogInscription}
                  handleClose={() => setOpDialogInscription(false)}
                />
              )
            }
          </>
      }
    </>
  );
};
