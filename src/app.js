const {handleError, ErrorHandler} = require('./helpers/error') 
const express = require('express')
const bodyParser = require('body-parser')
const tasks = require('./tasks/tasks.controller')

const app = express()

app.get('/', (req, res) => {
    res.send(`Success ${res.statusCode} ${req.originalUrl}`)
})
app.get('/error', (req, res) => {
    throw new ErrorHandler(500, 'Internal server error')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/tasks', tasks)
app.use((err, req, res, next) => handleError(err, res))

module.exports = app