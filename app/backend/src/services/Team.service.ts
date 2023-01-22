import TeamModel from '../database/models/Team.model';

export default class TeamService {
  constructor(private model: typeof TeamModel) {}

  public getAll = async () => {
    const results = await this.model.findAll();
    return results;
  };

  public getById = async (id: string) => {
    const result = await this.model.findByPk(id);
    return result;
  };
}
