import { ComponentButton, ComponentSearch } from "@/components";
import { useAlertStore, useAuthStore, usePlayerStore, useTournamentStore } from "@/hooks";
import { PlayerModel, TournamentModel } from "@/models";
import { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  DialogActions,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import React from "react";

interface Props {
  playerCount: number;
  substituteCount: number;
  selectPlayers: (players: { player: PlayerModel; role: string; nick: string }[]) => void;
  cancel: () => void;
}

export const CreateTeam = (props: Props) => {
  const { playerCount, substituteCount, selectPlayers, cancel } = props;
  const { showWarning } = useAlertStore();
  const { user } = useAuthStore();
  const { players } = usePlayerStore();
  const { tournament } = useTournamentStore();

  const [initPlayers, setInitPlayers] = useState<PlayerModel[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<PlayerModel[]>([]);
  const [playersSelected, setPlayersSelected] = useState<{ player: PlayerModel; role: string; nick: string }[]>([]);

  useEffect(() => {
    const playersSubscribe = (tournament as TournamentModel).inscriptions
      .map((inscription) => inscription.team.teamToPlayers.map((player) => player.playerId))
      .flat();

    // Filtrar los jugadores que NO están inscritos en este torneo
    setInitPlayers((players as PlayerModel[]).filter((player) => !playersSubscribe.includes(player.id)));


  }, [players, tournament]);

  useEffect(() => {
    // asignacion de mi mismo al team
    const player: PlayerModel = {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      nick: user.player.nick
    }
    handleSelectPlayer(player)
  }, [])


  const handleSearch = (value: string) => {
    if (value === "") {
      setFilteredPlayers([]);
      return;
    }

    const lowerCaseValue = value.toLowerCase();
    const filtered = initPlayers.filter(
      (player: PlayerModel) =>
        player.nick.toLowerCase().includes(lowerCaseValue) &&
        !playersSelected.some((selected) => selected.player.id === player.id)
    );
    setFilteredPlayers(filtered);
  };

  const handleSelectPlayer = (player: PlayerModel) => {
    if (playersSelected.length >= (playerCount + substituteCount)) {
      return;
    }

    setPlayersSelected([...playersSelected, { player, role: "PLAYER", nick: player.nick }]);
    setFilteredPlayers(filteredPlayers.filter((p) => p.id !== player.id));
  };

  const handleRemovePlayer = (playerId: number) => {
    const removedPlayer = playersSelected.find((selected) => selected.player.id === playerId);
    if (removedPlayer) {
      setFilteredPlayers((prev) =>
        [...prev, removedPlayer.player].filter(
          (player) =>
            !playersSelected.some((selected) => selected.player.id === player.id) ||
            player.id === playerId
        )
      );
    }
    setPlayersSelected(playersSelected.filter((selected) => selected.player.id !== playerId));
  };

  const handleRoleChange = (playerId: number, newRole: string) => {
    setPlayersSelected((prev) =>
      prev.map((selected) =>
        selected.player.id === playerId ? { ...selected, role: newRole } : selected
      )
    );
  };
  const handleNickChange = (playerId: number, newNick: string) => {
    console.log(newNick)
    setPlayersSelected((prev) =>
      prev.map((selected) =>
        selected.player.id === playerId ? { ...selected, nick: newNick } : selected
      )
    );
  };

  const validateRoles = () => {
    const playerRoles = playersSelected.reduce(
      (acc, { role }) => {
        if (role === "PLAYER") acc.jugador += 1;
        if (role === "CAPTAIN") acc.capitan += 1;
        if (role === "SUBSTITUTE") acc.suplente += 1;
        return acc;
      },
      { jugador: 0, capitan: 0, suplente: 0 }
    );

    const { jugador, capitan, suplente } = playerRoles;

    // Validar las condiciones
    if (
      (jugador === 4 && capitan === 1 && suplente === 0) ||
      (jugador === 4 && capitan === 1 && suplente === 2)
    ) {
      return true;
    }
    showWarning('Oops', `Recuerda debe ver 1 Capitán, ${playerCount - 1} jugadores y almenos ${substituteCount} suplentes`)
    return false;
  };



  return (
    <>
      <ComponentSearch search={handleSearch} title="Buscar Jugador" />
      <List>
        {filteredPlayers.map((player) => (
          <ListItem
            key={player.id}
            secondaryAction={
              <Button variant="outlined" onClick={() => handleSelectPlayer(player)}>
                Seleccionar
              </Button>
            }
          >
            <ListItemText primary={`${player.nick}`} />
          </ListItem>
        ))}
      </List>
      {playersSelected.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>
            Jugadores seleccionados:
          </Typography>
          <List>
            {playersSelected.map(({ player, role, nick }) => (
              <React.Fragment key={player.id}>
                <Typography gutterBottom>
                  {player.nick}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {/* Campo para modificar el nick */}
                  <TextField
                    label="Nick de Atinad"
                    value={nick}
                    onChange={(e) => handleNickChange(player.id, e.target.value)}
                  />

                  {/* Selector de rol */}
                  <FormControl>
                    <InputLabel>Rol</InputLabel>
                    <Select
                      value={role}
                      onChange={(e) => handleRoleChange(player.id, e.target.value)}
                      label="Rol"
                    >
                      <MenuItem value="CAPTAIN">Capitán</MenuItem>
                      <MenuItem value="PLAYER">Jugador</MenuItem>
                      <MenuItem value="SUBSTITUTE">Suplente</MenuItem>
                    </Select>
                  </FormControl>

                  {/* Botón para quitar jugador */}
                  {player.id != user.id && <IconButton onClick={() => handleRemovePlayer(player.id)}>
                    <DeleteOutline color="error" />
                  </IconButton>
                  }
                </Box>
              </React.Fragment>
            ))}
          </List>
        </>
      )}

      <DialogActions>
        <ComponentButton
          text="Cancelar"
          onClick={() => cancel()}
        />
        <ComponentButton
          text="Continuar"
          onClick={() => {
            if (validateRoles()) {
              selectPlayers(playersSelected);
            }
          }}
        />
      </DialogActions>
    </>
  );
};
