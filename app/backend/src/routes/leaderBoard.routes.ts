import { Router } from 'express';
import TeamModel from '../database/models/Team.model';
import MatchModel from '../database/models/Match.model';
import LeaderBoardController from '../controllers/LeaderBoard.controller';
import LeaderBoardService from '../services/LeaderBoard.service';

const leaderBoardController = new LeaderBoardController(
  new LeaderBoardService(MatchModel, TeamModel),
);

const router = Router();

router.get('/', (req, res) =>
  leaderBoardController.getGeneral(req, res));
router.get('/home', (req, res) =>
  leaderBoardController.getHome(req, res));
router.get('/away', (req, res) =>
  leaderBoardController.getAway(req, res));

export default router;
