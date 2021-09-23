import { getAllTasks, getTask, updateTask, deleteTask, createTask } from '../../tasks.service';
import * as repository from '../../repository';

describe('function getAllTasks()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockData = jest.spyOn(repository, 'getAllTasksDB');
  it('getAllTasks function check for true', async () => {
    expect(await getAllTasks()).toBeTruthy();
  });
  it('should return all tasks', async () => {
    const mockTasks = [
      { id: 1, title: '1', description: '1' },
      { id: 2, title: '2', description: '2' },
    ];
    mockData.mockImplementation(() => Promise.resolve(mockTasks));
    const expetedTasks = await getAllTasks();
    expect(mockData).toHaveBeenCalled();
    expect(expetedTasks).toEqual(mockTasks);
  });
  it('should return an error message after an error occur', async () => {
    const mockError = null;
    mockData.mockImplementation(() => Promise.reject(mockError));
    await getAllTasks().catch((err) => expect(err).toBe(mockError));
  });
});

describe('function getTask()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockData = jest.spyOn(repository, 'getTaskById');
  it('should return a task', async () => {
    const mockTasks = { id: 1, title: '1', description: '1' };
    mockData.mockImplementation(() => Promise.resolve(mockTasks));
    const expetedTask = await getTask(1);
    expect(mockData).toHaveBeenCalled();
    expect(expetedTask).toEqual(mockTasks);
  });
  it('should return an error message after an error occur', async () => {
    const mockError = null;
    mockData.mockImplementation(() => Promise.reject(mockError));
    await getAllTasks().catch((err) => expect(err).toBe(mockError));
  });
});

describe('function createTask()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockData = jest.spyOn(repository, 'createNewTask');
  it('should return a new task', async () => {
    const newTask = { id: 1, title: '1', description: '1' };
    mockData.mockImplementation(() => Promise.resolve(newTask));
    const expetedNewTask = await createTask('1', '1');
    expect(mockData).toHaveBeenCalled();
    expect(expetedNewTask).toEqual(newTask);
  });
  it('should return an error message after an error occur', async () => {
    const mockError = null;
    mockData.mockImplementation(() => Promise.reject(mockError));
    await getAllTasks().catch((err) => expect(err).toBe(mockError));
  });
});

describe('function updateTask()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockData = jest.spyOn(repository, 'updateTaskById');
  it('should return an update task', async () => {
    const updTask = { id: 1, title: '1', description: '1' };
    mockData.mockImplementation(() => Promise.resolve(updTask));
    const expetedNewTask = await updateTask(1, '1', '1');
    expect(mockData).toHaveBeenCalled();
    expect(expetedNewTask).toEqual(updTask);
  });
  it('should return an error message after an error occur', async () => {
    const mockError = null;
    mockData.mockImplementation(() => Promise.reject(mockError));
    await getAllTasks().catch((err) => expect(err).toBe(mockError));
  });
});

describe('function deleteTask()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockData = jest.spyOn(repository, 'deleteTaskById');
  it('should return a delete Task', async () => {
    const delTask = { id: 1, title: '1', description: '1' };
    mockData.mockImplementation(() => Promise.resolve(delTask));
    const expetedDelTask = await deleteTask(1);
    expect(mockData).toHaveBeenCalled();
    expect(expetedDelTask).toEqual(delTask);
  });
  it('should return an error message after an error occur', async () => {
    const mockError = null;
    mockData.mockImplementation(() => Promise.reject(mockError));
    await getAllTasks().catch((err) => expect(err).toBe(mockError));
  });
});
