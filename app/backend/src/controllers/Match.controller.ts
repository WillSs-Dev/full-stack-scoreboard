import { Request, Response } from 'express';
import HTTPCodes from '../utils/HTTPCodes';
import MatchService from '../services/Match.service';

export default class MatchController {
  constructor(private service: MatchService) {}

  public getAll = async (req: Request, res: Response) => {
    const results = await this.service.getAll();
    return res.status(HTTPCodes.ok).json(results);
  };
}
