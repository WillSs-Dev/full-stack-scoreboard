import ITeamStats from '../interfaces/TeamStats';
import MatchModel from '../database/models/Match.model';
import TeamModel from '../database/models/Team.model';
import TeamStats from '../utils/TeamStats';

export default class LeaderBoardService {
  constructor(
    private matchModel: typeof MatchModel,
    private teamModel: typeof TeamModel,
  ) {}

  private generateTeamStats = (team: TeamModel, teamMatches: MatchModel[]) => {
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
    // sorting an array of objects by two or more properties:

    // https://levelup.gitconnected.com/sort-array-of-objects-by-two-properties-in-javascript-69234fa6f474

    // "First, check the first (a.colA < b.colA) sort constraint. We need to check if in fact the two properties are different. If they’re different, then perform the sort. If they are not then we cannot sort them based on the first constraint."

    const resolvedResults = await Promise.all(allTeamsStats);
    const sortedResults = resolvedResults
      .sort((a, b) => {
        if (a.totalPoints === b.totalPoints) {
          if (a.totalVictories === b.totalVictories) {
            if (a.goalsBalance === b.goalsBalance) {
              if (a.goalsFavor === b.goalsFavor) {
                return a.goalsOwn > b.goalsOwn ? -1 : 1;
              }
              return a.goalsFavor > b.goalsFavor ? -1 : 1;
            }
            return a.goalsBalance > b.goalsBalance ? -1 : 1;
          }
          return a.totalVictories > b.totalVictories ? -1 : 1;
        }
        return a.totalPoints > b.totalPoints ? -1 : 1;
      });
    return sortedResults;
  };

  public getHome = async () => {
    const teams = await this.teamModel.findAll();
    const allTeamsStats = teams.map(async (team) => {
      const teamMatches = await this.matchModel.findAll({
        where: { homeTeamId: team.id, inProgress: false },
      });
      const teamStats = this.generateTeamStats(team, teamMatches);
      const organizedStats = this.organizeStats(teamStats);
      return organizedStats;
    });
    const sortedResults = this.sortResults(allTeamsStats);
    return sortedResults;
  };
}
