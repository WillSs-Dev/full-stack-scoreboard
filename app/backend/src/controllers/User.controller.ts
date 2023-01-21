import { Request, Response } from 'express';
import HTTPCodes from '../utils/HTTPCodes';
import UserService from '../services/User.service';

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
}
