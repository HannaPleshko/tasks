import { ErrorHandler, handleError } from '../../error';
import { Response } from 'express';

describe('test error.ts', () => {
  describe('class ErrorHandler:', () => {
    it('should success', () => {
      const mockErrorHandler = new ErrorHandler(404, 'Error');

      expect(mockErrorHandler.statusCode).toBe(404);
      expect(mockErrorHandler.message).toBe('Error');
    });
  });

  describe('function handleError()', () => {
    it('should success', () => {
      const err: iError = {
        statusCode: 500,
        message: 'Error'
      }
      const response: Response = {
        json: jest.fn(),
        status: jest.fn()
      }
      handleError(err, response)

      expect(response.json).toHaveBeenCalled()
      expect(response.status).toHaveBeenCalled()
    });
  });
});
