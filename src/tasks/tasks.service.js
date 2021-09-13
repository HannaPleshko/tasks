const tasks = [
    {
        id: '0',
        title: 'title_0',
        description: 'description_0',
    },
    {
        id: '1',
        title: 'title_1',
        description: 'description_1',
    },
]

getAllTasks = () => tasks

getTask = (id) => tasks.find(el => el.id === id ? el : null)

updateTask = (id, title, description) => {
    return tasks.find(el => {
        if (el.id === id) {
            title.trim() ? el.title = title : null
            description.trim() ? el.description = description : null
            return el
        } 
    })
}

deleteTask = (id) => {
    return tasks.find(el => {
        if (el.id === id) {
            tasks.splice(tasks.indexOf(el), 1)
            return el
        }
    })
}

module.exports = {getAllTasks, getTask, updateTask, deleteTask}