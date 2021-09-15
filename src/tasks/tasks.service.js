const {createNewTask, getAllTasksDB, getTaskById, updateTaskById, deleteTaskById} = require('./repository')


getAllTasks = async () => await getAllTasksDB().catch(err => console.log(`Exception in getAllTasks: ${err.message}`))

getTask = async (id) => await getTaskById(id).catch(err => console.log(`Exception in getTask: ${err.message}`))

updateTask = async (id, title, description) => await updateTaskById(id, title, description).catch(err => console.log(`Exception in updateTask: ${err.message}`))

deleteTask = async (id) => await deleteTaskById(id).catch(err => console.log(`Exception in deleteTask: ${err.message}`))

createTask = async (title, description) => await createNewTask(title, description).catch(err => console.log(`Exception in createTask: ${err.message}`))


module.exports = {getAllTasks, getTask, updateTask, deleteTask, createTask}
