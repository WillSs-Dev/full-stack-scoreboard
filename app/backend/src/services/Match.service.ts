import MatchModel from '../database/models/Match.model';
import TeamModel from '../database/models/Team.model';

export default class MatchService {
  constructor(private model: typeof MatchModel) {}

  public getAll = async (inProgress?: boolean) => {
    const results = await this.model.findAll({
      include: [
        {
          model: TeamModel,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: TeamModel,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
      where: inProgress ? { inProgress } : {},
    });
    return results;
  };
}
