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

describe('', () => {
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
        { id: 1, title: '1', description: '1' },
        { id: 2, title: '2', description: '2' },
      ];
      pool.query.mockResolvedValue({ rows: mockTasks, rowCount: 0 });
      const expected = await getAllTasksDB();
      expect(pool.query).toBeCalledWith(`SELECT * FROM tasks`);
      expect(expected).toEqual(mockTasks);
    });

    it('should failure', async () => {
      pool.query.mockResolvedValue(new Error('Error'));
      let expected = await getAllTasksDB().catch();
      expect(expected).toBe(null);
    });
  });

  describe('function getTaskById()', () => {
    it('should success', async () => {
      const mockTasks = [
        { id: 1, title: '1', description: '1' },
        { id: 2, title: '2', description: '2' },
      ];
      pool.query.mockResolvedValue({ rows: mockTasks, rowCount: 0 });
      const expected = await getTaskById(1);
      expect(pool.query).toBeCalledWith(`SELECT * FROM tasks WHERE id = $1`, [1]);
      expect(expected).toEqual(mockTasks);
    });

    it('should failure', async () => {
      pool.query.mockResolvedValue(new Error('Error'));
      let expected = await getTaskById(1).catch();
      expect(expected).toBe(null);
    });
  });

  describe('function createNewTask()', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('should success', async () => {
      const mockTasks = [{ id: 1, title: '1', description: '1' }];
      mockClient.query('BEGIN');
      mockClient.query.mockResolvedValue({ rows: mockTasks, rowCount: 0 });
      mockClient.query('BEGIN');
      mockClient.release();
      const expected = await createNewTask('1', '1');
      expect(mockClient.query).toBeCalledWith(`INSERT INTO tasks (title, description) VALUES($1, $2) RETURNING tasks.*`, ['1', '1']);
      expect(expected).toEqual(mockTasks);
    });

    it('should failure', async () => {
      mockClient.query('BEGIN');
      mockClient.query.mockResolvedValue(new Error('Error'));
      mockClient.query('ROLLBACK');
      mockClient.release();
      let expected = await createNewTask('1', '1').catch();
      expect(expected).toBe(null);
    });
  });

  describe('function updateTaskById()', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('should success', async () => {
      const mockTasks = [{ id: 1, title: '1', description: '1' }];
      mockClient.query('BEGIN');
      mockClient.query.mockResolvedValue({ rows: mockTasks, rowCount: 0 });
      mockClient.query('BEGIN');
      mockClient.release();
      const expected = await updateTaskById(1, '1', '1');
      expect(mockClient.query).toBeCalledWith(`UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING tasks.*`, [
        '1',
        '1',
        1,
      ]);
      expect(expected).toEqual(mockTasks);
    });

    it('should failure', async () => {
      mockClient.query('BEGIN');
      mockClient.query.mockResolvedValue(new Error('Error'));
      mockClient.query('ROLLBACK');
      mockClient.release();
      let expected = await createNewTask('1', '1').catch();
      expect(expected).toBe(null);
    });
  });

  describe('function deleteTaskById()', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('should success', async () => {
      const mockTasks = [{ id: 1, title: '1', description: '1' }];
      mockClient.query('BEGIN');
      mockClient.query.mockResolvedValue({ rows: mockTasks, rowCount: 0 });
      mockClient.query('BEGIN');
      mockClient.release();
      const expected = await deleteTaskById(1);
      expect(mockClient.query).toBeCalledWith(`DELETE FROM tasks WHERE id = $1 RETURNING tasks.*`, [1]);
      expect(expected).toEqual(mockTasks);
    });

    it('should failure', async () => {
      mockClient.query('BEGIN');
      mockClient.query.mockResolvedValue(new Error('Error'));
      mockClient.query('ROLLBACK');
      mockClient.release();
      let expected = await createNewTask('1', '1').catch();
      expect(expected).toBe(null);
    });
  });
});
