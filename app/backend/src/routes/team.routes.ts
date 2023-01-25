import { Router } from 'express';
import TeamController from '../controllers/Team.controller';
import TeamService from '../services/Team.service';
import TeamModel from '../database/models/Team.model';

const teamController = new TeamController(new TeamService(TeamModel));
const router = Router();

router.get('/', (req, res) => teamController.getAll(req, res));
router.get('/:id', (req, res) => teamController.getById(req, res));

export default router;
