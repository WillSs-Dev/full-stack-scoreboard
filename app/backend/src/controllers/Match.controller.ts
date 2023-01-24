import { Request, Response } from 'express';
import HTTPCodes from '../utils/HTTPCodes';
import MatchService from '../services/Match.service';
import IMatch from '../interfaces/Match';

export default class MatchController {
  constructor(private service: MatchService) {}

  public getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress) {
      const results = await this.service.getAll(inProgress as string);
      return res.status(HTTPCodes.ok).json(results as IMatch[]);
    }
    const results = await this.service.getAll();
    return res.status(HTTPCodes.ok).json(results as IMatch[]);
  };

  public create = async (req: Request, res: Response) => {
    const newMatch = await this.service.create(req.body);
    return res.status(HTTPCodes.created).json(newMatch as IMatch);
  };
}
