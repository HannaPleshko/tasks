const {createNewTask, getAllTasksDB, getTaskById, updateTaskById, deleteTaskById} = require('./repository')
const {ErrorHandler} = require('../helpers/error')

getAllTasks = async () => {
    const allTasks = await getAllTasksDB().catch(err => { throw err })
    if (!allTasks) throw new ErrorHandler(404, 'Tasks not found!')
    return allTasks
}

getTask = async (id) => {
    const task = await getTaskById(id).catch(err => { throw err })
    if (!task) throw new ErrorHandler(404, 'Tasks not found!')
    return task
}

updateTask = async (id, title, description) => {
    const updTask = await updateTaskById(id, title, description).catch(err => { throw err })
    if (!updTask) throw new ErrorHandler(404, 'Tasks not found!')
    return updTask
}

deleteTask = async (id) => {
    const delTask = await deleteTaskById(id).catch(err => { throw err })
    if (!delTask) throw new ErrorHandler(404, 'Page not found!')
    return delTask
}

createTask = async (title, description) =>{
    const newTask = await createNewTask(title, description).catch(err => { throw err })
    if (!newTask) throw new ErrorHandler(404, 'Page not found!')
    return newTask
}


module.exports = {getAllTasks, getTask, updateTask, deleteTask, createTask}
