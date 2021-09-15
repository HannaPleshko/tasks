const {ErrorHandler} = require('../helpers/error') 
const {validData} = require('../helpers/validation')
const express = require('express')
const {getAllTasks, getTask, updateTask, deleteTask, createTask} = require('./tasks.service')
const app = require('../app')

const router = express.Router()

router.get('/', async (req, res) => {
    const requiredData = await getAllTasks()

    if (requiredData) res.status(200).json(requiredData)
    else res.status(404).send('Server error! The database is empty!')
})
router.post('/', async (req, res, next) => {
    const {title, description} = req.body
    const requiredData = await createTask(title.trim(), description.trim())

    if (requiredData) res.status(200).json(requiredData)
    else res.status(404).send('Server error! Task was not created!')
})
router.get('/:id', async (req, res) => {
    const {id} = req.params
    const requiredData = await getTask(id)
    
    if (requiredData) res.status(200).json(requiredData)
    else res.status(404).send('Server error! The task with the required identifier is missing')
})
router.put('/:id', async (req, res) => {
    const {id} = req.params
    const {title, description} = req.body
    const requiredData = await updateTask(id, title.trim(), description.trim())

    if (requiredData) res.status(200).json(requiredData)
    else res.status(404).send('The task with the required identifier is missing')
})
router.delete('/:id', async (req, res) => {
    const {id} = req.params
    const requiredData = await deleteTask(id)

    if (requiredData) res.status(200).json(requiredData)
    else res.status(404).send('The task with the required identifier is missing')
})
router.get('/error', (req, res) => {
    throw new ErrorHandler(500, 'Internal server error')
})

router.use((req, res, next) => validData(req, res, next))

module.exports = router