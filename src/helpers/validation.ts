import { Request, Response, NextFunction } from 'express';
import { ExceptionType } from '../exception/exception';
import { ErrorHandler } from './error';

const validDataTask = (req: Request, res: Response, next: NextFunction) => {
  const { title, description } = req.body;
  if (title.trim() && description.trim()) next();
  else throw new ErrorHandler(500, ExceptionType.CHECK_FOR_EMPTY);
};

const validDataUser = (req: Request, res: Response, next: NextFunction) => {
  const { login, password } = req.body;
  if (login.trim() && password.trim()) next();
  else throw new ErrorHandler(500, ExceptionType.CHECK_FOR_EMPTY);
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer' && req.headers.authorization.split(' ')[1]) next();
  else throw new ErrorHandler(500, ExceptionType.TOKEN_MISSING);
};

export { validDataTask, validDataUser, verifyToken };
