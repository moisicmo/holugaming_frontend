import { ComponentSearch } from "@/components";
import { usePlayerStore } from "@/hooks";
import { PlayerModel } from "@/models";
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
} from "@mui/material";

export const CreateTeam = () => {
  const { players, getPlayers } = usePlayerStore();
  const [filteredPlayers, setFilteredPlayers] = useState<PlayerModel[]>([]);
  const [playersSelected, setPlayersSelected] = useState<
    { player: PlayerModel; role: string }[]
  >([]);

  useEffect(() => {
    getPlayers();
  }, []);

  const handleSearch = (value: string) => {
    if (value === "") {
      setFilteredPlayers([]);
      return;
    }

    const lowerCaseValue = value.toLowerCase();
    const filtered = players.filter(
      (player: PlayerModel) =>
        player.nick.toLowerCase().includes(lowerCaseValue) &&
        !playersSelected.some((selected) => selected.player.id === player.id)
    );
    setFilteredPlayers(filtered);
  };

  const handleSelectPlayer = (player: PlayerModel) => {
    if (playersSelected.length >= 5) {
      return;
    }

    setPlayersSelected([...playersSelected, { player, role: "Jugador" }]);
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
        <Typography variant="h6" gutterBottom>
          Jugadores seleccionados:
        </Typography>
      )}
      <List>
        {playersSelected.map(({ player, role }) => (
          <ListItem
            key={player.id}
            secondaryAction={
              <>
                <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
                  <InputLabel>Rol</InputLabel>
                  <Select
                    value={role}
                    onChange={(e) => handleRoleChange(player.id, e.target.value)}
                    label="Rol"
                  >
                    <MenuItem value="Capitán">Capitán</MenuItem>
                    <MenuItem value="Jugador">Jugador</MenuItem>
                    <MenuItem value="Suplente">Suplente</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="outlined" color="error" onClick={() => handleRemovePlayer(player.id)}>
                  Quitar
                </Button>
              </>
            }
          >
            <ListItemText primary={`${player.nick}`} />
          </ListItem>
        ))}
      </List>
    </>
  );
};
