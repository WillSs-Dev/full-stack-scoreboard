import { Request, Response } from 'express';
import HTTPCodes from '../utils/HTTPCodes';
import MatchService from '../services/Match.service';
import IMatch from '../interfaces/Match';

export default class MatchController {
  constructor(private service: MatchService) {}

  public getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress) {
      const results = await this.service.getAll(JSON.parse(inProgress as string));
      return res.status(HTTPCodes.ok).json(results as IMatch[]);
    }
    const results = await this.service.getAll();
    return res.status(HTTPCodes.ok).json(results as IMatch[]);
  };
}
