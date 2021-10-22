import { Pool } from 'pg';
import { createNewTask, getAllTasksDB, getTaskById, updateTaskById, deleteTaskById } from '../../repository';

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

  describe('function getAllTasksDB()', () => {
    it('should success', async () => {
      const mockTasks = [
        { id: 1, title: '1', description: '1', user_id: 1 },
        { id: 2, title: '2', description: '2', user_id: 1 },
      ];

      pool.query.mockResolvedValue({ rows: mockTasks });
      const expected = await getAllTasksDB(1);

      expect(pool.query).toBeCalledWith('SELECT * FROM tasks WHERE user_id = $1', [1]);
      expect(expected).toEqual(mockTasks);
    });

    it('should failure', async () => {
      pool.query.mockRejectedValue(new Error('Error'));

      const expected = await getAllTasksDB(1).catch();

      expect(expected).toBe(null);
    });
  });

  describe('function getTaskById()', () => {
    it('should success', async () => {
      const mockTasks = [{ id: 1, title: '1', description: '1', user_id: 1 }];

      pool.query.mockResolvedValue({ rows: mockTasks });
      const expected = await getTaskById(1, 1);

      expect(pool.query).toBeCalledWith('SELECT * FROM tasks WHERE id = $1 AND user_id = $2', [1, 1]);
      expect(expected).toEqual(mockTasks);
    });

    it('should failure', async () => {
      pool.query.mockRejectedValue(new Error('Error'));

      const expected = await getTaskById(1, 1).catch();

      expect(expected).toBe(null);
    });
  });

  describe('function createNewTask()', () => {
    it('should success', async () => {
      const mockTasks = [{ id: 1, title: '1', description: '1', user_id: 1 }];

      mockClient.query.mockResolvedValue({ rows: mockTasks });
      const expected = await createNewTask('1', '1', 1);

      expect(mockClient.query).toBeCalledWith(`BEGIN`);
      expect(mockClient.query).toBeCalledWith(`INSERT INTO tasks (title, description, user_id) VALUES($1, $2, $3) RETURNING tasks.*`, [
        '1',
        '1',
        1,
      ]);
      expect(mockClient.query).toBeCalledWith(`COMMIT`);
      expect(mockClient.release).toHaveBeenCalled();
      expect(expected).toEqual(mockTasks);
    });

    it('should failure', async () => {
      mockClient.query.mockRejectedValueOnce(new Error('Error'));
      const expected = await createNewTask('1', '1', 1).catch();

      expect(mockClient.query).toBeCalledWith(`BEGIN`);
      expect(mockClient.query).toBeCalledWith(`ROLLBACK`);
      expect(mockClient.release).toHaveBeenCalled();
      expect(expected).toBe(null);
    });
  });

  describe('function updateTaskById()', () => {
    it('should success', async () => {
      const mockTasks = [{ id: 1, title: '1', description: '1', user_id: 1 }];

      mockClient.query.mockResolvedValue({ rows: mockTasks });
      const expected = await updateTaskById(1, '1', '1', 1);

      expect(mockClient.query).toBeCalledWith(`BEGIN`);
      expect(mockClient.query).toBeCalledWith(
        `UPDATE tasks SET title = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING tasks.*`,
        ['1', '1', 1, 1]
      );
      expect(mockClient.query).toBeCalledWith(`COMMIT`);
      expect(mockClient.release).toHaveBeenCalled();
      expect(expected).toEqual(mockTasks);
    });

    it('should failure', async () => {
      mockClient.query.mockRejectedValueOnce(new Error('Error'));
      const expected = await updateTaskById(1, '1', '1', 1).catch();

      expect(mockClient.query).toBeCalledWith(`BEGIN`);
      expect(mockClient.query).toBeCalledWith(`ROLLBACK`);
      expect(mockClient.release).toHaveBeenCalled();
      expect(expected).toBe(null);
    });
  });

  describe('function deleteTaskById()', () => {
    it('should success', async () => {
      const mockTasks = [{ id: 1, title: '1', description: '1', user_id: 1 }];

      mockClient.query.mockResolvedValue({ rows: mockTasks });
      const expected = await deleteTaskById(1, 1);

      expect(mockClient.query).toBeCalledWith(`BEGIN`);
      expect(mockClient.query).toBeCalledWith(`DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING tasks.*`, [1, 1]);
      expect(mockClient.query).toBeCalledWith(`COMMIT`);
      expect(mockClient.release).toHaveBeenCalled();
      expect(expected).toEqual(mockTasks);
    });

    it('should failure', async () => {
      mockClient.query.mockRejectedValueOnce(new Error('Error'));
      const expected = await deleteTaskById(1, 1).catch();

      expect(mockClient.query).toBeCalledWith(`BEGIN`);
      expect(mockClient.query).toBeCalledWith(`ROLLBACK`);
      expect(mockClient.release).toHaveBeenCalled();
      expect(expected).toBe(null);
    });
  });
});
