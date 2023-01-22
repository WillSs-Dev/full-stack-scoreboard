import TeamModel from '../database/models/Team.model';

export default class TeamService {
  constructor(private model: typeof TeamModel) {}

  public getAll = async () => {
    const results = await this.model.findAll();
    return results;
  };
}
