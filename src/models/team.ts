import { TeamToPlayerModel } from "./teamToPlayer";

export interface TeamModel{
  id: number;
  name: string;
  teamToPlayers: TeamToPlayerModel[];
  shieldUrl?:string;
}