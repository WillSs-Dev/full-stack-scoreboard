import { Request, Response } from 'express';
import HTTPCodes from '../utils/HTTPCodes';
import TeamService from '../services/Team.service';

export default class TeamController {
  constructor(private service: TeamService) {}

  public getAll = async (__req: Request, res: Response) => {
    const results = await this.service.getAll();
    return res.status(HTTPCodes.ok).json(results);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.service.getById(id);
    return res.status(HTTPCodes.ok).json(result);
  };
}
