/* eslint-disable max-lines-per-function */
import * as express from 'express';

import userRouter from './routes/user.routes';
import teamRouter from './routes/team.routes';
import matchRouter from './routes/match.routes';
import leaderBoardRouter from './routes/leaderBoard.routes';

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
    this.app.use('/login', userRouter);

    this.app.use('/teams', teamRouter);

    this.app.use('/matches', matchRouter);

    this.app.use('/leaderboard', leaderBoardRouter);
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
