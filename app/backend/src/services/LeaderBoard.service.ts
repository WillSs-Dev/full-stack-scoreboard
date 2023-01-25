import sortArray = require('sort-array');
import ITeamStats from '../interfaces/TeamStats';
import MatchModel from '../database/models/Match.model';
import TeamModel from '../database/models/Team.model';
import TeamStats from '../utils/TeamStats';

export default class LeaderBoardService {
  constructor(
    private matchModel: typeof MatchModel,
    private teamModel: typeof TeamModel,
  ) {}

  private generateHomeTeamStats = (team: TeamModel, teamMatches: MatchModel[]) => {
    const teamStats = new TeamStats(team.teamName, teamMatches.length);
    teamMatches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        teamStats.teamWon();
      }
      if (match.homeTeamGoals < match.awayTeamGoals) {
        teamStats.teamLost();
      }
      if (match.homeTeamGoals === match.awayTeamGoals) {
        teamStats.teamDraw();
      }
      teamStats.goalsOwn += match.awayTeamGoals;
      teamStats.goalsFavor += match.homeTeamGoals;
    });
    teamStats.finilizeStats();
    return teamStats;
  };

  private generateAwayTeamStats = (team: TeamModel, teamMatches: MatchModel[]) => {
    const teamStats = new TeamStats(team.teamName, teamMatches.length);
    teamMatches.forEach((match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) {
        teamStats.teamWon();
      }
      if (match.homeTeamGoals > match.awayTeamGoals) {
        teamStats.teamLost();
      }
      if (match.homeTeamGoals === match.awayTeamGoals) {
        teamStats.teamDraw();
      }
      teamStats.goalsOwn += match.homeTeamGoals;
      teamStats.goalsFavor += match.awayTeamGoals;
    });
    teamStats.finilizeStats();
    return teamStats;
  };

  private organizeStats = (teamStats: TeamStats) => ({
    name: teamStats.name,
    totalPoints: teamStats.totalPoints,
    totalGames: teamStats.totalGames,
    totalVictories: teamStats.totalVictories,
    totalDraws: teamStats.totalDraws,
    totalLosses: teamStats.totalLosses,
    goalsFavor: teamStats.goalsFavor,
    goalsOwn: teamStats.goalsOwn,
    goalsBalance: teamStats.goalsBalance,
    efficiency: teamStats.efficiency,
  });

  private sortResults = async (allTeamsStats: Promise<ITeamStats>[]) => {
    const resolvedResults = await Promise.all(allTeamsStats);
    const sortedResults = sortArray(resolvedResults, {
      by: ['totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor', 'goalsOwn'],
      order: ['desc', 'desc', 'desc', 'desc', 'asc'],
    });
    return sortedResults;
  };

  public getHome = async () => {
    const teams = await this.teamModel.findAll();
    const allTeamsStats = teams.map(async (team) => {
      const teamMatches = await this.matchModel.findAll({
        where: { homeTeamId: team.id, inProgress: false },
      });
      const teamStats = this.generateHomeTeamStats(team, teamMatches);
      const organizedStats = this.organizeStats(teamStats);
      return organizedStats;
    });
    const sortedResults = this.sortResults(allTeamsStats);
    return sortedResults;
  };

  public getAway = async () => {
    const teams = await this.teamModel.findAll();
    const allTeamsStats = teams.map(async (team) => {
      const teamMatches = await this.matchModel.findAll({
        where: { awayTeamId: team.id, inProgress: false },
      });
      const teamStats = this.generateAwayTeamStats(team, teamMatches);
      const organizedStats = this.organizeStats(teamStats);
      return organizedStats;
    });
    const sortedResults = this.sortResults(allTeamsStats);
    return sortedResults;
  };
}
