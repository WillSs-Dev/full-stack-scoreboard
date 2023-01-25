import { Router } from 'express';
import {
  validateMatchBody,
  validateMatchResult,
  validateParams,
  validateTeams,
} from '../middlewares/match';
import MatchController from '../controllers/Match.controller';
import MatchService from '../services/Match.service';
import MatchModel from '../database/models/Match.model';

const matchController = new MatchController(new MatchService(MatchModel));
const router = Router();

router.get('/', validateParams, (req, res) =>
  matchController.getAll(req, res));
router.post('/', validateMatchBody, validateTeams, (req, res) =>
  matchController.create(req, res));
router.patch('/:id', validateMatchResult, (req, res) =>
  matchController.updateResult(req, res));
router.patch('/:id/finish', (req, res) =>
  matchController.finish(req, res));

export default router;
