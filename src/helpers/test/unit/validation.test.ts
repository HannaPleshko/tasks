import { validData } from '../../validation';
import { ExceptionType } from '../../../exception/exception';
import { ErrorHandler } from '../../error';
import { Request, Response, NextFunction } from 'express';

describe('function validData()', () => {
  const mRequest: Request = { body: {} };
  const mResponse: Response = jest.fn();
  const mNextFunction: NextFunction = jest.fn();

  it('should success', () => {
    const [title, description] = ['title', 'description'];
    mRequest.body.title = title;
    mRequest.body.description = description;
    validData(mRequest, mResponse, mNextFunction);

    expect(mNextFunction).toHaveBeenCalled();
  });

  it('should failure', () => {
    const [title, description] = [' ', ' '];
    mRequest.body.title = title;
    mRequest.body.description = description;
    let exception;
    try {
      validData(mRequest, mResponse, mNextFunction);
    } catch (err) {
      exception = err;
    }

    expect(exception instanceof ErrorHandler).toBeTruthy();
    expect(exception.statusCode).toBe(500);
    expect(exception.message).toBe(ExceptionType.CHECK_FOR_EMPTY);
  });
});
