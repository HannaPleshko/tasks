import express, { Request, Response } from 'express';
import { ExceptionType, SuccessType } from '../exception/exception';
import { ErrorHandler, handleError } from '../helpers/error';
import { createCookie } from '../helpers/jwt';
import { buildResponse } from '../helpers/response';
import { validDataUser } from '../helpers/validation';
import { createUser, findUser, hardDeleteUser, deleteUser } from './auth.service';

const router = express.Router();

router.post('/register', validDataUser, async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;
    await createUser(login, password);

    buildResponse(res, 200, SuccessType.SUCCESS);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

router.post('/login', validDataUser, async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;
    const tokenData = await findUser(login, password);

    res.setHeader('authorization', [createCookie(tokenData)]);

    buildResponse(res, 200, SuccessType.SUCCESS);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

router.post('/logout', async (req: Request, res: Response) => {
  try {
    res.setHeader('authorization', [
      createCookie({
        token: ' ',
      }),
    ]);

    buildResponse(res, 200, SuccessType.LOGOUT_SUCCESS);
  } catch (error) {
    buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});

router.delete('/delUser', async (req: Request, res: Response) => {
  try {
    req.body.hardDelete ? await hardDeleteUser(req.body.hardDelete.login) : null;
    req.body.login ? await deleteUser(req.body.login) : null;

    buildResponse(res, 200, SuccessType.SUCCESS);
  } catch (err) {
    if (err instanceof ErrorHandler) handleError(err, res);
    else buildResponse(res, 500, ExceptionType.SERVER_ERROR);
  }
});
export { router };
