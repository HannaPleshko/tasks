const {ErrorHandler} = require('../helpers/error') 
const {validData} = require('../helpers/validation')
const express = require('express')
const {getAllTasks, getTask, updateTask, deleteTask, createTask} = require('./tasks.service')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const requiredData = await getAllTasks()
        res.status(200).json(requiredData)
    } catch (err) {
        if (err instanceof ErrorHandler) res.status(404).send('Page not found!')
        else res.status(500).send('Server error!')
    }
})
router.post('/', validData, async (req, res, next) => {
    try {
        const {title, description} = req.body
        const requiredData = await createTask(title.trim(), description.trim())
        res.status(200).json(requiredData)
    } catch (err) {
        if (err instanceof ErrorHandler) res.status(404).send('Page not found!')
        else res.status(500).send('Server error!')
    }
})
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const requiredData = await getTask(id)
        res.status(200).json(requiredData)
    } catch (err) {
        if (err instanceof ErrorHandler) res.status(404).send('Page not found')
        else res.status(500).send('Server error!')
    }
})
router.put('/:id', validData, async (req, res) => {
    try {
        const {id} = req.params
        const {title, description} = req.body
        const requiredData = await updateTask(id, title.trim(), description.trim())
        res.status(200).json(requiredData)
    } catch (err) {
        if (err instanceof ErrorHandler) res.status(404).send('Page not found')
        else res.status(500).send('Server error!')
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const requiredData = await deleteTask(id)
        res.status(200).json(requiredData)
    } catch (err) {
        if (err instanceof ErrorHandler) res.status(404).send('Page not found')
        else res.status(500).send('Server error!')
    }
})
router.get('/error', (req, res) => {
    throw new ErrorHandler(500, 'Internal server error')
})

module.exports = router