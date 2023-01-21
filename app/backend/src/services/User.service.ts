import { compareSync } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UserModel from '../database/models/User.model';

export default class UserService {
  private model = UserModel;

  public login = async (email: string, password: string) => {
    const [user] = await this.model.findAll({ where: { email } });
    if (!user) {
      return null;
    }
    const passwordMatches = compareSync(password, user.password);
    if (passwordMatches) {
      const token = jwt.sign(
        { email, password, role: user.role },
        process.env.JWT_SECRET || 'jwt_secret',
        { expiresIn: '7d' },
      );
      return { token };
    }
    return null;
  };
}
