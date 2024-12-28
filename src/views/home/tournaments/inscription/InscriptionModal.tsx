import { Dialog, DialogTitle, Box, Slide } from "@mui/material";
import { useEffect, useState } from "react";
import { CreateTeam } from "./CreateTeam";
import { Inscription } from "./Inscription";
import { PlayerModel, TournamentModel } from "@/models";
import { useInscriptionStore, usePlayerStore, useTeamStore, useTournamentStore } from "@/hooks";

interface Props {
  tournament: TournamentModel;
  open: boolean;
  handleClose: () => void;
}

export const InscriptionModal = (props: Props) => {
  const { tournament, open, handleClose } = props;

  const { getPlayers } = usePlayerStore();
  const { getTournamentById } = useTournamentStore();

  useEffect(() => {
    getPlayers();
    getTournamentById(tournament.id);
  }, []);

  const [value, setValue] = useState(1);
  const { createTeam } = useTeamStore();
  const { createInscription } = useInscriptionStore();
  const [playersSelected, setPlayersSelected] = useState<{ player: PlayerModel; role: string; nick: string }[]>([]);


  const handleTeam = async (name: String) => {
    const request = {
      "gameId": tournament.game.id,
      "name": name,
      "players": playersSelected.map(player => ({
        "playerId": player.player.id,
        "role": player.role,
        "nick": player.nick
      }))
    };
    const team = await createTeam(request);
    await createInscription({"teamId":team.id,"tournamentId":tournament.id});
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}

      sx={{
        '& .MuiDialog-paper': {
          width: '600px', maxWidth: 'none', backgroundColor: '#1e1e1e',
          color: '#ffffff',
        }
      }}
    >
      {value === 1 && (
        <Slide direction="right" in={value === 1} mountOnEnter unmountOnExit>
          <Box p={3}>
            <DialogTitle>{'Empieza a crear a tu equipo'}</DialogTitle>
            <CreateTeam
              playerCount={tournament.playerCount}
              substituteCount={tournament.substituteCount}
              selectPlayers={(v) => {
                setPlayersSelected(v)
                setValue(2)
              }}
              cancel={() => handleClose()}
            />
          </Box>
        </Slide>
      )}
      {
        value == 2 && (
          <Slide direction="left" in={value === 2} mountOnEnter unmountOnExit>
            <Box p={3}>
              <DialogTitle>{'Identifica a tu equipo'}</DialogTitle>
              <Inscription
                nameTeam={(v) => handleTeam(v)}
                cancel={() => handleClose()}
              />
            </Box>
          </Slide>
        )
      }
    </Dialog>
  );
};
