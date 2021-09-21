import express, { Request, Response } from 'express';
import { ExceptionType } from '../exception/exception';
import { ErrorHandler, handleError } from '../helpers/error';
import { buildResponse } from '../helpers/response';
import { validData } from '../helpers/validation';
import { getAllTasks, getTask, updateTask, deleteTask, createTask } from './tasks.service';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const allTasks = await getAllTasks();
    buildResponse(res, 200, allTasks);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});
router.post('/', validData, async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const newTask = await createTask(title.trim(), description.trim());
    buildResponse(res, 200, newTask);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await getTask(id);
    buildResponse(res, 200, task);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});
router.put('/:id', validData, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updTask = await updateTask(id, title.trim(), description.trim());
    buildResponse(res, 200, updTask);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const delTask = await deleteTask(id);
    buildResponse(res, 200, delTask);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

export { router };
