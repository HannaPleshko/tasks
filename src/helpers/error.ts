import {Request, Response, NextFunction} from 'express'

class ErrorHandler extends Error {
    readonly statusCode: number
    readonly message: string
    constructor(statusCode: number, message: string) {
        super()
        this.statusCode = statusCode
        this.message = message
    }
}

const handleError = (err: iError, res: Response) => {
    const {statusCode, message} = err
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    })
}
  
export {
    ErrorHandler,
    handleError
}