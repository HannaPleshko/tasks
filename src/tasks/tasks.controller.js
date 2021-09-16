const {ErrorHandler, handleError} = require('../helpers/error') 
const {validData} = require('../helpers/validation')
const express = require('express')
const {getAllTasks, getTask, updateTask, deleteTask, createTask} = require('./tasks.service')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const allTasks = await getAllTasks()
        res.status(200).json(allTasks)
    } catch (err) {
        if (err instanceof ErrorHandler) handleError(err, res)
        else res.status(500).send('Server error!')
    }
})
router.post('/', validData, async (req, res, next) => {
    try {
        const {title, description} = req.body
        const newTask = await createTask(title.trim(), description.trim())
        res.status(200).json(newTask)
    } catch (err) {
        if (err instanceof ErrorHandler) handleError(err, res)
        else res.status(500).send('Server error!')
    }
})
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const task = await getTask(id)
        res.status(200).json(task)
    } catch (err) {
        if (err instanceof ErrorHandler) handleError(err, res)
        else res.status(500).send('Server error!')
    }
})
router.put('/:id', validData, async (req, res) => {
    try {
        const {id} = req.params
        const {title, description} = req.body
        const updTask = await updateTask(id, title.trim(), description.trim())
        res.status(200).json(updTask)
    } catch (err) {
        if (err instanceof ErrorHandler) handleError(err, res)
        else res.status(500).send('Server error!')
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const delTask = await deleteTask(id)
        res.status(200).json(delTask)
    } catch (err) {
        if (err instanceof ErrorHandler) handleError(err, res)
        else res.status(500).send('Server error!')
    }
})

module.exports = router