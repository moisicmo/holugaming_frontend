import { ComponentButton } from '@/components';
import { useAuthStore, useTournamentStore } from '@/hooks';
import { InscriptionModel } from '@/models';
import { AuthModal } from '@/views/auth/AuthModal';
import { Card, CardContent, Grid, Typography, Tooltip, Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InscriptionModal } from './inscription/InscriptionModal';
import { Person } from '@mui/icons-material';

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
        tournament != null && <>
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
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(0.95)',
                      },
                      boxShadow: 3, // Añadir sombra para hacer que resalte
                      borderRadius: 2, // Bordes redondeados para un look moderno
                    }}
                  >
                    <CardContent>
                      <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} color="text.secondary">
                        {inscription.team.name}
                      </Typography>

                      {/* Mostrar los jugadores */}
                      <Typography variant="body2" color="text.secondary">
                        Jugadores:
                      </Typography>
                      <Grid container spacing={1} alignItems="center">
                        {inscription.team.teamToPlayers.map(player => (
                          <Grid item key={player.playerId}>
                            <Tooltip title={player.nick} placement="top">
                              <Avatar sx={{ bgcolor: '#3f51b5', width: 32, height: 32, color: 'white' }}>
                                <Person />
                              </Avatar>
                            </Tooltip>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
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
                tournament={tournament}
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
