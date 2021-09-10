const express = require('express')
const service = require('./tasks.service')

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send(service.getAllTasks())
})
router.post('/', (req, res) => {
    console.log(req.body)
    res.send(`Success ${res.statusCode} ${req.originalUrl}`)
})
router.get('/:id', (req, res) => {
    const requiredData = service.getTask(req.params.id)
    if (requiredData) res.status(200).send(requiredData)
    else res.status(404).send('The task with the required identifier is missing')
})
router.put('/:id', (req, res) => {
    const taskData = {
        id: req.params.id,
        title: req.body.title,
        description: req.body.description,
    }
    const requiredData = service.updateTask(taskData.id, taskData.title, taskData.description)
    if (requiredData) res.status(200).send(requiredData)
    else res.status(404).send('The task with the required identifier is missing')
})
router.delete('/:id', (req, res) => {
    const requiredData = service.deleteTask(req.params.id)
    if (requiredData) res.status(200).send(requiredData)
    else res.status(404).send('The task with the required identifier is missing')
})

module.exports = router