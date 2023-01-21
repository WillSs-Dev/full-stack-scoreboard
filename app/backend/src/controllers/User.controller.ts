import { Request, Response } from 'express';
import HTTPCodes from '../utils/HTTPCodes';
import UserService from '../services/User.service';
import IUser from '../interfaces/User';

export default class UserController {
  constructor(private service: UserService) {}

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const validateLogin = await this.service.login(email, password);
    if (validateLogin) {
      return res.status(HTTPCodes.ok).json({ token: validateLogin.token });
    }
    return res
      .status(HTTPCodes.authenticationError)
      .json({ message: 'Incorrect email or password' });
  };

  public validateUser = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const payload = await this.service.validateUser(authorization as string) as IUser;
    if (payload) {
      return res.status(HTTPCodes.ok).json({ role: payload.role });
    }
    return res.status(HTTPCodes.authenticationError).json({ message: 'Expired or invalid token' });
  };
}
