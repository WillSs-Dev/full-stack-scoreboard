import MatchModel from '../database/models/Match.model';
import TeamModel from '../database/models/Team.model';

export default class MatchService {
  constructor(private model: typeof MatchModel) {}

  public getAll = async () => {
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
    });
    return results;
  };
}