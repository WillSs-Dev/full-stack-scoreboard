import IMatch from '../interfaces/Match';
import MatchModel from '../database/models/Match.model';
import TeamModel from '../database/models/Team.model';

export default class MatchService {
  constructor(private model: typeof MatchModel) {}

  public getAll = async (inProgress?: string) => {
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
      where: inProgress ? { inProgress: JSON.parse(inProgress) } : {},
    });
    return results;
  };

  public create = async (match: IMatch) => {
    const result = await this.model.create({ ...match, inProgress: true });
    return result;
  };
}
