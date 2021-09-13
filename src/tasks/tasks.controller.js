const express = require('express')
const service = require('./tasks.service')

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json(service.getAllTasks())
})
router.post('/', (req, res) => {
    console.log(req.body)
    res.send(`Success ${res.statusCode} ${req.originalUrl}`)
})
router.get('/:id', (req, res) => {
    const {id} = req.params
    const requiredData = service.getTask(id)
    if (requiredData) res.status(200).json(requiredData)
    else res.status(404).send('The task with the required identifier is missing')
})
router.put('/:id', (req, res) => {
    const {id} = req.params
    const {title, description} = req.body
    const requiredData = service.updateTask(id, title, description)

    if (requiredData) res.status(200).json(requiredData)
    else res.status(404).send('The task with the required identifier is missing')
})
router.delete('/:id', (req, res) => {
    const requiredData = service.deleteTask(req.params.id)
    if (requiredData) res.status(200).json(requiredData)
    else res.status(404).send('The task with the required identifier is missing')
})

module.exports = router