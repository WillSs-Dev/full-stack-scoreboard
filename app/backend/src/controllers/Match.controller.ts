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
    const { authorization } = req.headers;
    const newMatch = await this.service.create(
      req.body,
      authorization as string,
    );
    if (!newMatch) {
      return res
        .status(HTTPCodes.authenticationError)
        .json({ message: 'Token must be a valid token' });
    }
    return res.status(HTTPCodes.created).json(newMatch as IMatch);
  };

  public finish = async (req: Request, res: Response) => {
    const { id } = req.params;
    const match = await this.service.getById(id);
    if (!match) {
      return res
        .status(HTTPCodes.notFound)
        .json({ message: 'Match doesn \'t exist' });
    }
    await this.service.finish(id);
    res.status(HTTPCodes.ok).json({ message: 'Finished' });
  };
}
