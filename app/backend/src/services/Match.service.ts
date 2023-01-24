import * as jwt from 'jsonwebtoken';
import IMatch from '../interfaces/Match';
import MatchModel from '../database/models/Match.model';
import TeamModel from '../database/models/Team.model';
import IMatchResult from '../interfaces/MatchResult';

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

  public create = async (match: IMatch, token: string) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret');
    } catch (err) {
      return null;
    }
    const result = await this.model.create({ ...match, inProgress: true });
    return { newMatch: result };
  };

  public getById = async (id: string) => {
    const result = await this.model.findByPk(id);
    return result;
  };

  public finish = async (id: string) => {
    await this.model.update({ inProgress: false }, { where: { id } });
  };

  public updateResult = async (id: string, results: IMatchResult) => {
    await this.model.update({ ...results }, { where: { id } });
  };
}
