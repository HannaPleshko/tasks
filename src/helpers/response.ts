import {Request, Response, NextFunction} from 'express'

const buildResponse = (res: Response, st: number, mess: iTask[] | iTask | string) => res.status(st).json(mess)

export {buildResponse}