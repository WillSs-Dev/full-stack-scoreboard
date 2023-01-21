import { NextFunction, Request, Response } from 'express';
import * as joi from 'joi';
import HTTPCodes from '../utils/HTTPCodes';

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const validateLoginRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(HTTPCodes.badRequest).json({ message: 'All fields must be filled' });
  }
  next();
};

export default validateLoginRequest;
