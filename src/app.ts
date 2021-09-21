import { bodyParser } from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';
import { ExceptionType } from './exception/exception';
import { handleError, ErrorHandler } from './helpers/error';
import { router as tasks } from './tasks/tasks.controller';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send(`Success ${res.statusCode} ${req.originalUrl}`);
});
app.get('/error', (req: Request, res: Response) => {
  throw new ErrorHandler(500, ExceptionType.SERVER_ERROR);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/tasks', tasks);
app.use((err, req: Request, res: Response, next: NextFunction) => handleError(err, res));

export { app };
