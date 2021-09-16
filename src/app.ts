import {handleError, ErrorHandler} from './helpers/error' 
import express, { Request, Response } from 'express'
import {bodyParser} from 'body-parser'
import {tasks} from './tasks/tasks.controller'

const app = express()

app.get('/', (req: Request, res: Response) => {
    res.send(`Success ${res.statusCode} ${req.originalUrl}`)
})
app.get('/error', (req: Request, res: Response) => {
    throw new ErrorHandler(500, 'Internal server error')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/tasks', tasks)
app.use((err, req, res, next) => handleError(err, res))

export {app}