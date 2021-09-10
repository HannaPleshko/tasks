const express = require('express')
const bodyParser = require('body-parser')
const tasks = require('./tasks/tasks.controller');

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/tasks', tasks)

app.get('/', (req, res) => {
    res.send(`Success ${res.statusCode} ${req.originalUrl}`)
})


module.exports = app