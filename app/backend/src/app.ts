import * as express from 'express';
import validateLoginRequest from './middlewares/login';
import {
  validateMatchBody,
  validateMatchResult,
  validateParams,
  validateTeams,
} from './middlewares/match';
import UserController from './controllers/User.controller';
import UserService from './services/User.service';
import UserModel from './database/models/User.model';
import TeamController from './controllers/Team.controller';
import TeamService from './services/Team.service';
import TeamModel from './database/models/Team.model';
import MatchController from './controllers/Match.controller';
import MatchService from './services/Match.service';
import MatchModel from './database/models/Match.model';
import LeaderBoardController from './controllers/LeaderBoard.controller';
import LeaderBoardService from './services/LeaderBoard.service';

const userController = new UserController(new UserService(UserModel));
const teamController = new TeamController(new TeamService(TeamModel));
const matchController = new MatchController(new MatchService(MatchModel));
const leaderBoardController = new LeaderBoardController(
  new LeaderBoardService(MatchModel, TeamModel),
);

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.routes();
  }

  private routes(): void {
    this.app.post('/login', validateLoginRequest, (req, res) =>
      userController.login(req, res));
    this.app.get('/login/validate', (req, res) =>
      userController.validateUser(req, res));

    this.app.get('/teams', (req, res) => teamController.getAll(req, res));
    this.app.get('/teams/:id', (req, res) => teamController.getById(req, res));

    this.app.get('/matches', validateParams, (req, res) =>
      matchController.getAll(req, res));
    this.app.post('/matches', validateMatchBody, validateTeams, (req, res) =>
      matchController.create(req, res));
    this.app.patch('/matches/:id', validateMatchResult, (req, res) =>
      matchController.updateResult(req, res));
    this.app.patch('/matches/:id/finish', (req, res) =>
      matchController.finish(req, res));

    this.app.get('/leaderboard/home', (req, res) =>
      leaderBoardController.getHome(req, res));
    this.app.get('/leaderboard/away', (req, res) =>
      leaderBoardController.getAway(req, res));
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,DELETE,OPTIONS,PUT,PATCH',
      );
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
