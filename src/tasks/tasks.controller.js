const express = require('express')
const service = require('./tasks.service')

const router = express.Router()

router.get('/', (req, res) => {
    res.send(`Success ${res.statusCode} ${req.originalUrl}`)
    console.log(deleteTask(1))
})
router.post('/', (req, res) => {
    console.log(req.body)
    res.send(`Success ${res.statusCode} ${req.originalUrl}`)
})
router.get('/:id', (req, res) => {
    res.send(`Success ${res.statusCode} ${req.originalUrl}`)
})
router.put('/:id', (req, res) => {
    const taskData = {
        id: req.params.id,
        title: req.body.title,
        description: req.body.description,
    }
    console.log(taskData)
    res.send(`Success ${res.statusCode} ${req.originalUrl}`)
})
router.delete('/:id', (req, res) => {
    console.log(req.params.id)
    res.send(`Success ${res.statusCode} ${req.originalUrl}`)
})

module.exports = router