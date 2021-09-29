import { Response } from 'express';

const buildResponse = (res: Response, st: number, mess: iTask[] | iTask | string) => {
  res.status(st);
  res.json(mess);
};

export { buildResponse };
