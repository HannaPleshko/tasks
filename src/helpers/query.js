const {ErrorHandler} = require('../helpers/error') 
const db = require('../database')

class ValidationQuery {

    validTitle = (title, description) => {
        if (!title.trim() || !description.trim())
            throw new ErrorHandler(500, 'Title or Description are missing')
    }

}
module.exports = {ValidationQuery}

