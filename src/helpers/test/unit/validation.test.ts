import { validData } from '../../validation';
import { ExceptionType } from '../../../exception/exception';
import { ErrorHandler } from '../../error';
import { Request, NextFunction } from 'express';

describe('function validData()', () => {
  const mRequest: Request = { body: {} };
  const mNextFunction: NextFunction = jest.fn();

  it('should success', () => {
    const [title, description] = ['title', 'description'];
    mRequest.body.title = title;
    mRequest.body.description = description;
    validData(mRequest, mNextFunction);

    expect(mNextFunction).toHaveBeenCalled();
  });

  it('should failure', () => {
    const [title, description] = [' ', ' '];
    mRequest.body.title = title;
    mRequest.body.description = description;
    let exception;
    try {
      validData(mRequest, mNextFunction);
    } catch (err) {
      exception = err;
    }
    // validData(mRequest, mNextFunction).catch()

    expect(exception instanceof ErrorHandler).toBeTruthy();
    expect(exception.statusCode).toBe(500);
    expect(exception.message).toBe(ExceptionType.CHECK_FOR_EMPTY);
  });
});
