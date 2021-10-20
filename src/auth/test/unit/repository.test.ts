import { Pool } from 'pg';
import { hardDeleteUser } from '../../auth.service';
import { findLogin, createNewUser, hardDelUser, delUser } from '../../repository';

const mockClient = {
  release: jest.fn(),
  query: jest.fn(),
};

jest.mock('pg', () => {
  const mPool = {
    connect: jest.fn(() => mockClient),
    query: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

describe('TestsForRepository', () => {
  let pool;

  beforeEach(() => {
    pool = new Pool();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('function findLogin()', () => {
    it('should success', async () => {
      const mockUser = [{ id: 1, login: '1', password: '1', status: 1 }];

      pool.query.mockResolvedValue({ rows: mockUser });
      const expected = await findLogin('1');

      expect(pool.query).toBeCalledWith('SELECT * FROM users WHERE login = $1', ['1']);
      expect(expected).toEqual(mockUser[0]);
    });

    it('should failure', async () => {
      pool.query.mockResolvedValue(new Error('Error'));

      const expected = await findLogin('1').catch();

      expect(expected).toBe(null);
    });
  });

  describe('function createNewUser()', () => {
    it('should success', async () => {
      const mockUser = [{ id: 1, login: '1', password: '1', status: 1 }];

      mockClient.query.mockResolvedValue({ rows: mockUser });
      const expected = await createNewUser('1', '1');

      expect(mockClient.query).toBeCalledWith(`BEGIN`);
      expect(mockClient.query).toBeCalledWith(`INSERT INTO users (login, password, status) VALUES($1, $2, 0) RETURNING users.*`, [
        '1',
        '1',
      ]);
      expect(mockClient.query).toBeCalledWith(`COMMIT`);
      expect(mockClient.release).toHaveBeenCalled();
      expect(expected).toEqual(mockUser);
    });

    it('should failure', async () => {
      mockClient.query.mockRejectedValueOnce(new Error('Error'));
      const expected = await createNewUser('1', '1').catch();

      expect(mockClient.query).toBeCalledWith(`BEGIN`);
      expect(mockClient.query).toBeCalledWith(`ROLLBACK`);
      expect(mockClient.release).toHaveBeenCalled();
      expect(expected).toBe(null);
    });
  });

  describe('function delUser()', () => {
    it('should success', async () => {
      const mockUser = [{ id: 1, login: '1', password: '1', status: 1 }];

      mockClient.query.mockResolvedValue({ rows: mockUser });
      const expected = await delUser('1');

      expect(mockClient.query).toBeCalledWith(`BEGIN`);
      expect(mockClient.query).toBeCalledWith(`UPDATE users SET status = 1 WHERE login = $1 RETURNING users.*`, ['1']);
      expect(mockClient.query).toBeCalledWith(`COMMIT`);
      expect(mockClient.release).toHaveBeenCalled();
      expect(expected).toEqual(mockUser);
    });

    it('should failure', async () => {
      mockClient.query.mockRejectedValueOnce(new Error('Error'));
      const expected = await delUser('1').catch();

      expect(mockClient.query).toBeCalledWith(`BEGIN`);
      expect(mockClient.query).toBeCalledWith(`ROLLBACK`);
      expect(mockClient.release).toHaveBeenCalled();
      expect(expected).toBe(null);
    });
  });

  describe('function hardDelUser()', () => {
    it('should success', async () => {
      const mockUser = [{ id: 1, login: '1', password: '1', status: 1 }];

      mockClient.query.mockResolvedValue({ rows: mockUser });
      const expected = await hardDelUser('1');

      expect(mockClient.query).toBeCalledWith(`BEGIN`);
      expect(mockClient.query).toBeCalledWith(`DELETE FROM users WHERE login = $1 RETURNING users.*`, ['1']);
      expect(mockClient.query).toBeCalledWith(`COMMIT`);
      expect(mockClient.release).toHaveBeenCalled();
      expect(expected).toEqual(mockUser);
    });

    it('should failure', async () => {
      mockClient.query.mockRejectedValueOnce(new Error('Error'));
      const expected = await hardDelUser('1').catch();

      expect(mockClient.query).toBeCalledWith(`BEGIN`);
      expect(mockClient.query).toBeCalledWith(`ROLLBACK`);
      expect(mockClient.release).toHaveBeenCalled();
      expect(expected).toBe(null);
    });
  });
});
