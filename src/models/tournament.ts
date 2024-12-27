import { GameModel, InscriptionModel } from ".";

export interface TournamentModel{
  id: number;
  name: string;
  numberTeams: number;
  start: Date;
  end: Date;
  inscriptionCost: number;
  playerCount: number;
  substituteCount: number;
  game: GameModel;
  inscriptions: InscriptionModel[];
}