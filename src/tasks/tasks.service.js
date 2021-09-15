const {Tasks} = require('./repository')

const tasks = new Tasks()


getAllTasks = async () => await tasks.getAllTasksDB()

getTask = async (id) => await tasks.getTaskById(id).catch(err => console.log(err)) 

updateTask = async (id, title, description) => await tasks.updateTaskById(id, title, description)

deleteTask = async (id) => await tasks.deleteTaskById(id)

createTask = async (title, description) => await tasks.createNewTask(title, description)


module.exports = {getAllTasks, getTask, updateTask, deleteTask, createTask}
