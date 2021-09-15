const {ErrorHandler} = require('./error') 

const validData = (req, res, next) => {
    const {title, description} = req.body
    if (title.trim() && description.trim()) next()
    else throw new ErrorHandler(500, 'Title or Description are missing')
}

module.exports = {validData} 