import { ExceptionType } from '../../../exception/exception';
import { ErrorHandler } from '../../../helpers/error';
import { createUser, findUser } from '../../auth.service';
import * as repository from '../../repository';

describe('function createUser()', () => {
  const findLoginMock = jest.spyOn(repository, 'findLogin');
  const createNewUserMock = jest.spyOn(repository, 'createNewUser');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('creating a user - success', async () => {
    const mockLogin = undefined;
    const mockNewUser = {
      id: 1,
      login: 'newUser',
      password: '$2b$10$fUqLsaw.EqlLeqcpiBEvM.A/n8PzRvX1vCnvFQuZ8DZk6kXm8VHai',
    };

    findLoginMock.mockImplementation(() => Promise.resolve(mockLogin));
    createNewUserMock.mockImplementation(() => Promise.resolve(mockNewUser));

    const { login } = await createUser('newUser', '123456');

    expect(findLoginMock).toHaveBeenCalled();
    expect(createNewUserMock).toHaveBeenCalled();
    expect('newUser').toBe(login);
  });

  it('creating a user - fail. This user already exists', async () => {
    const mockUser = {
      id: 1,
      login: 'newUser',
      password: '$2b$10$fUqLsaw.EqlLeqcpiBEvM.A/n8PzRvX1vCnvFQuZ8DZk6kXm8VHai',
    };

    findLoginMock.mockImplementation(() => Promise.resolve(mockUser));

    let exception;
    try {
      await createUser('newUser', '123456');
    } catch (err) {
      exception = err;
    }

    expect(exception instanceof ErrorHandler).toBeTruthy();
    expect(exception.statusCode).toBe(500);
    expect(exception.message).toBe(ExceptionType.USER_ALREADY_EXISTS);
  });

  it('creating a user - fail. Not Found!', async () => {
    const mockLogin = undefined;
    const mockNewUser = undefined;

    findLoginMock.mockImplementation(() => Promise.resolve(mockLogin));
    createNewUserMock.mockImplementation(() => Promise.resolve(mockNewUser));

    let exception;
    try {
      await createUser('newUser', '123456');
    } catch (err) {
      exception = err;
    }

    expect(exception instanceof ErrorHandler).toBeTruthy();
    expect(exception.statusCode).toBe(404);
    expect(exception.message).toBe(ExceptionType.NOT_FOUND);
  });
});

describe('function findUser()', () => {
  const findLoginMock = jest.spyOn(repository, 'findLogin');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('find a user - success', async () => {
    const mockUser = {
      id: 1,
      login: 'newUser',
      password: '$2b$10$fUqLsaw.EqlLeqcpiBEvM.A/n8PzRvX1vCnvFQuZ8DZk6kXm8VHai',
      user_id: 1,
    };

    findLoginMock.mockImplementation(() => Promise.resolve(mockUser));

    const token = await findUser('newUser', '123456');

    expect(findLoginMock).toHaveBeenCalled();
  });

  it('creating a user - fail. This user already exists', async () => {
    const mockUser = undefined;

    findLoginMock.mockImplementation(() => Promise.resolve(mockUser));

    let exception;
    try {
      await createUser('newUser', '123456');
    } catch (err) {
      exception = err;
    }

    expect(exception instanceof ErrorHandler).toBeTruthy();
    expect(exception.statusCode).toBe(404);
    expect(exception.message).toBe(ExceptionType.NOT_FOUND);
  });

  it('creating a user - fail. Input Error!', async () => {
    const mockUser = {
      id: 1,
      login: 'newUser',
      password: '$2b$10$fUqLsaw.EqlLeqcpiBEvM.A/n8PzRvX1vCnvFQuZ8DZk6kXm8VHai',
      user_id: 1,
    };

    findLoginMock.mockImplementation(() => Promise.resolve(mockUser));

    let exception;
    try {
      await findUser('newUser', 'wrong password');
    } catch (err) {
      exception = err;
    }

    expect(exception instanceof ErrorHandler).toBeTruthy();
    expect(exception.statusCode).toBe(500);
    expect(exception.message).toBe(ExceptionType.INPUT_ERROR_PASSWORD);
  });
});
