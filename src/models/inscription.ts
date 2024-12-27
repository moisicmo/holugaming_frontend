import { TeamModel } from ".";

export interface InscriptionModel{
  id: number;
  isPayment: boolean;
  team: TeamModel;
}