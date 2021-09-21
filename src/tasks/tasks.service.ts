import {createNewTask, getAllTasksDB, getTaskById, updateTaskById, deleteTaskById} from './repository'
import {ErrorHandler} from '../helpers/error'
import { ExceptionType } from '../exception/exception'

const getAllTasks = async (): Promise<iTask[]> => {
    const allTasks = await getAllTasksDB().catch(err => { throw err })
    if (!allTasks) throw new ErrorHandler(404, ExceptionType.NOT_FOUND)
    return allTasks
}

const getTask = async (id: number): Promise<iTask> => {
    const task = await getTaskById(id).catch(err => { throw err })
    if (!task) throw new ErrorHandler(404, ExceptionType.NOT_FOUND)
    return task
}

const updateTask = async (id: number, title: string, description: string): Promise<iTask> => {
    const updTask = await updateTaskById(id, title, description).catch(err => { throw err })
    if (!updTask) throw new ErrorHandler(404, ExceptionType.NOT_FOUND)
    return updTask
}

const deleteTask = async (id: number): Promise<iTask> => {
    const delTask = await deleteTaskById(id).catch(err => { throw err })
    if (!delTask) throw new ErrorHandler(404, ExceptionType.NOT_FOUND)
    return delTask
}

const createTask = async (title: string, description: string): Promise<iTask> => {
    const newTask = await createNewTask(title, description).catch(err => { throw err })
    if (!newTask) throw new ErrorHandler(404, ExceptionType.NOT_FOUND)
    return newTask
}


export {getAllTasks, getTask, updateTask, deleteTask, createTask}
