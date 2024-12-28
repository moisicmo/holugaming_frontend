import { TeamToPlayerModel } from "./teamToPlayer";



export interface FormTeamModel {
  name: string;
}

export interface FormTeamValidations {
  name: [(value: string) => boolean, string];
}

export interface TeamModel{
  id: number;
  name: string;
  teamToPlayers: TeamToPlayerModel[];
  shieldUrl?:string;
}