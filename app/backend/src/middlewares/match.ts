import { NextFunction, Request, Response } from 'express';
import * as joi from 'joi';
import HTTPCodes from '../utils/HTTPCodes';

const querySchema = joi.object({
  inProgress: joi.valid('true', 'false'),
});

const validateParams = (req: Request, res: Response, next: NextFunction) => {
  const { error } = querySchema.validate(req.query);
  if (error) {
    return res.status(HTTPCodes.badRequest).json({ message: 'Invalid query' });
  }
  next();
};

export default validateParams;
