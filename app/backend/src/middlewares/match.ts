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

const matchBodySchema = joi.object({
  homeTeamId: joi.number().required(),
  awayTeamId: joi.number().required(),
  homeTeamGoals: joi.number().required(),
  awayTeamGoals: joi.number().required(),
});

const validateMatchBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = matchBodySchema.validate(req.body);
  if (error) {
    return res.status(HTTPCodes.badRequest).json({ message: 'Invalid request body' });
  }
  next();
};

export { validateParams, validateMatchBody };
