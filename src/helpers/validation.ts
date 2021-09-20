import {ErrorHandler} from './error'
import {Request, Response, NextFunction} from 'express'

const validData = (req: Request, res: Response, next: NextFunction) => {
    const {title, description} = req.body
    if (title.trim() && description.trim()) next()
    else throw new ErrorHandler(500, 'Title or Description are missing')
}

export {validData} 