const {createNewTask, getAllTasksDB, getTaskById, updateTaskById, deleteTaskById} = require('./repository')
const {ErrorHandler} = require('../helpers/error')

getAllTasks = async () => {
    try {
        const arrOfTasks = await getAllTasksDB()
        if (!arrOfTasks) throw new ErrorHandler(500, 'Internal server error')
        return arrOfTasks
    } catch (err) {
        throw err
    }
}

getTask = async (id) => {
    try {
        const arrOfTasks = await getTaskById(id)
        console.log(!arrOfTasks);
        if (!arrOfTasks) throw new ErrorHandler(404, 'Internal server error')
        return arrOfTasks
    } catch (err) {
        throw err
    }
}

updateTask = async (id, title, description) => {
    try {
        const arrOfTasks = await updateTaskById(id, title, description)
        if (!arrOfTasks) throw new ErrorHandler(404, 'Internal server error')
        return arrOfTasks
    } catch (err) {
        throw err
    }
}

deleteTask = async (id) => {
    try {
        const arrOfTasks = await deleteTaskById(id)
        if (!arrOfTasks) throw new ErrorHandler(404, 'Internal server error')
        return arrOfTasks
    } catch (err) {
        throw err
    }
}

createTask = async (title, description) =>{
    try {
        const arrOfTasks = await createNewTask(title, description)
        if (!arrOfTasks) throw new ErrorHandler(404, 'Internal server error')
        return arrOfTasks
    } catch (err) {
        throw err
    }
}


module.exports = {getAllTasks, getTask, updateTask, deleteTask, createTask}
