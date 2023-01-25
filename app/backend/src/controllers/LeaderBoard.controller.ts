import { Request, Response } from 'express';
import HTTPCodes from '../utils/HTTPCodes';
import LeaderBoardService from '../services/LeaderBoard.service';

export default class LeaderBoardController {
  constructor(private service: LeaderBoardService) {}

  public getHome = async (req: Request, res: Response) => {
    const leaderboard = await this.service.getHome();
    return res.status(HTTPCodes.ok).json(leaderboard);
  };

  public getAway = async (req: Request, res: Response) => {
    const leaderboard = await this.service.getAway();
    return res.status(HTTPCodes.ok).json(leaderboard);
  };
}
