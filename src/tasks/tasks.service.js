const {Tasks} = require('./repository')

const tasks = new Tasks()


getAllTasks = async () => await tasks.getAllTasksDB().catch(err => console.log(`Exception in getAllTasks: ${err.message}`))

getTask = async (id) => await tasks.getTaskById(id).catch(err => console.log(`Exception in getTask: ${err.message}`))

updateTask = async (id, title, description) => await tasks.updateTaskById(id, title, description).catch(err => console.log(`Exception in updateTask: ${err.message}`))

deleteTask = async (id) => await tasks.deleteTaskById(id).catch(err => console.log(`Exception in deleteTask: ${err.message}`))

createTask = async (title, description) => await tasks.createNewTask(title, description).catch(err => console.log(`Exception in createTask: ${err.message}`))


module.exports = {getAllTasks, getTask, updateTask, deleteTask, createTask}
