import * as repository from '../../repository';
import { getAllTasks, getTask, updateTask, deleteTask, createTask } from '../../tasks.service';

describe('function getAllTasks()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const getAllTasksMock = jest.spyOn(repository, 'getAllTasksDB');

  it('should return all tasks', async () => {
    const mockTasks = [
      { id: 1, title: '1', description: '1', user_id: 1 },
      { id: 2, title: '2', description: '2', user_id: 1 },
    ];

    getAllTasksMock.mockResolvedValue(mockTasks);
    const expetedTasks = await getAllTasks(1);

    expect(getAllTasksMock).toHaveBeenCalled();
    expect(expetedTasks).toEqual(mockTasks);
  });

  it('should return an error message after an error occur', async () => {
    const mockError = null;

    getAllTasksMock.mockRejectedValue(mockError);

    await getAllTasks(1).catch((err) => expect(err).toBe(mockError));
  });
});

describe('function getTask()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const getTaskMock = jest.spyOn(repository, 'getTaskById');

  it('should return a task', async () => {
    const mockTasks = { id: 1, title: '1', description: '1' };

    getTaskMock.mockResolvedValue(mockTasks);
    const expetedTask = await getTask(1, 1);

    expect(getTaskMock).toHaveBeenCalled();
    expect(expetedTask).toEqual(mockTasks);
  });

  it('should return an error message after an error occur', async () => {
    const mockError = null;

    getTaskMock.mockRejectedValue(mockError);

    await getTask(1, 1).catch((err) => expect(err).toBe(mockError));
  });
});

describe('function createTask()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const createNewTaskMock = jest.spyOn(repository, 'createNewTask');

  it('should return a new task', async () => {
    const newTask = { id: 1, title: '1', description: '1', user_id: 1 };

    createNewTaskMock.mockResolvedValue(newTask);
    const expetedNewTask = await createTask('1', '1', 1);

    expect(createNewTaskMock).toHaveBeenCalled();
    expect(expetedNewTask).toEqual(newTask);
  });

  it('should return an error message after an error occur', async () => {
    const mockError = null;

    createNewTaskMock.mockRejectedValue(mockError);

    await createTask('1', '1', 1).catch((err) => expect(err).toBe(mockError));
  });
});

describe('function updateTask()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const updateTaskMock = jest.spyOn(repository, 'updateTaskById');

  it('should return an update task', async () => {
    const updTask = { id: 1, title: '1', description: '1', user_id: 1 };

    updateTaskMock.mockResolvedValue(updTask);
    const expetedNewTask = await updateTask(1, '1', '1', 1);

    expect(updateTaskMock).toHaveBeenCalled();
    expect(expetedNewTask).toEqual(updTask);
  });

  it('should return an error message after an error occur', async () => {
    const mockError = null;

    updateTaskMock.mockRejectedValue(mockError);

    await updateTask(1, '1', '1', 1).catch((err) => expect(err).toBe(mockError));
  });
});

describe('function deleteTask()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const deleteTaskMock = jest.spyOn(repository, 'deleteTaskById');

  it('should return a delete Task', async () => {
    const delTask = { id: 1, title: '1', description: '1', user_id: 1 };

    deleteTaskMock.mockResolvedValue(delTask);
    const expetedDelTask = await deleteTask(1, 1);

    expect(deleteTaskMock).toHaveBeenCalled();
    expect(expetedDelTask).toEqual(delTask);
  });

  it('should return an error message after an error occur', async () => {
    const mockError = null;

    deleteTaskMock.mockRejectedValue(mockError);

    await deleteTask(1, 1).catch((err) => expect(err).toBe(mockError));
  });
});
