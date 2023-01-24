import MatchModel from '../database/models/Match.model';

export default interface IMatch extends MatchModel {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam?: {
    teamName: string;
  };
  awayTeam?: {
    teamName: string;
  };
}
