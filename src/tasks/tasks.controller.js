const {ErrorHandler} = require('../helpers/error') 
const express = require('express')
const {validData} = require('../helpers/validation')
const {getAllTasks, getTask, updateTask, deleteTask, createTask} = require('./tasks.service')

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json(getAllTasks())
})
router.post('/', (req, res, next) => {
    validData(req, res, next)
    const {title, description} = req.body
    res.status(200).json(createTask(title, description))
})
router.get('/:id', (req, res) => {
    const {id} = req.params
    const requiredData = getTask(id)
    if (requiredData) res.status(200).json(requiredData)
    else res.status(404).send('The task with the required identifier is missing')
})
router.put('/:id', (req, res) => {
    const {id} = req.params
    const {title, description} = req.body
    const requiredData = updateTask(id, title, description)

    if (requiredData) res.status(200).json(requiredData)
    else res.status(404).send('The task with the required identifier is missing')
})
router.delete('/:id', (req, res) => {
    const requiredData = deleteTask(req.params.id)
    if (requiredData) res.status(200).json(requiredData)
    else res.status(404).send('The task with the required identifier is missing')
})
router.get('/error', (req, res) => {
    throw new ErrorHandler(500, 'Internal server error')
})

module.exports = router