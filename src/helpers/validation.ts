import { Request, Response, NextFunction } from 'express';
import { ExceptionType } from '../exception/exception';
import { ErrorHandler } from './error';

const validData = (req: Request, res: Response, next: NextFunction) => {
  const { title, description } = req.body;
  if (title.trim() && description.trim()) next();
  else throw new ErrorHandler(500, ExceptionType.CHECK_FOR_EMPTY);
};

export { validData };
