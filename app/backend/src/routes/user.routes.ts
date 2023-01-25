import { Router } from 'express';
import validateLoginRequest from '../middlewares/login';
import UserController from '../controllers/User.controller';
import UserService from '../services/User.service';
import UserModel from '../database/models/User.model';

const userController = new UserController(new UserService(UserModel));
const router = Router();

router.post('/', validateLoginRequest, (req, res) =>
  userController.login(req, res));
router.get('/validate', (req, res) =>
  userController.validateUser(req, res));

export default router;
