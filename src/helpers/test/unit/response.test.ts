import { buildResponse } from '../../response';
import { Response } from 'express';

describe('function buildResponse()', () => {
  it('should success', () => {
    const mResponse: Response = {
      status: jest.fn(),
      json: jest.fn(),
    };
    const message = [{ id: 1, title: '1', description: '1' }];
    buildResponse(mResponse, 200, message);

    expect(mResponse.status).toHaveBeenCalledWith(200);
    expect(mResponse.json).toHaveBeenCalledWith(message);
  });
});
