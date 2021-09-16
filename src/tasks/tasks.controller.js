const {ErrorHandler, handleError} = require('../helpers/error') 
const {validData} = require('../helpers/validation')
const express = require('express')
const {getAllTasks, getTask, updateTask, deleteTask, createTask} = require('./tasks.service')
const {buildResponse} = require('../helpers/response')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const allTasks = await getAllTasks()
        buildResponse(res, 200, allTasks)
    } catch (err) {
        if (err instanceof ErrorHandler) handleError(err, res)
        else buildResponse(res, 500, 'Server error!')
    }
})
router.post('/', validData, async (req, res, next) => {
    try {
        const {title, description} = req.body
        const newTask = await createTask(title.trim(), description.trim())
        buildResponse(res, 200, newTask)
    } catch (err) {
        if (err instanceof ErrorHandler) handleError(err, res)
        else buildResponse(res, 500, 'Server error!')
    }
})
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const task = await getTask(id)
        buildResponse(res, 200, task)
    } catch (err) {
        if (err instanceof ErrorHandler) handleError(err, res)
        else buildResponse(res, 500, 'Server error!')
    }
})
router.put('/:id', validData, async (req, res) => {
    try {
        const {id} = req.params
        const {title, description} = req.body
        const updTask = await updateTask(id, title.trim(), description.trim())
        buildResponse(res, 200, updTask)
    } catch (err) {
        if (err instanceof ErrorHandler) handleError(err, res)
        else buildResponse(res, 500, 'Server error!')
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const delTask = await deleteTask(id)
        buildResponse(res, 200, delTask)
    } catch (err) {
        if (err instanceof ErrorHandler) handleError(err, res)
        else buildResponse(res, 500, 'Server error!')
    }
})

module.exports = router