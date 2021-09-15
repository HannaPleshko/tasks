const {ErrorHandler} = require('../helpers/error') 
const {pool, client} = require('../database')

class Tasks {
    
    createNewTask = async (title, description) => {
        const client = await pool.connect()
        try {
            await client.query('BEGIN')
            const sql = 'INSERT INTO tasks (title, description) VALUES($1, $2) RETURNING tasks.*'
            const arrOfVal = (await client.query(sql, [title, description])).rows
            await client.query('COMMIT')
            if (arrOfVal.length > 0) return arrOfVal 
            else throw new ErrorHandler(500, 'Not found')
        } catch (err) {
            console.log(`Exception in createNewTask: ${err.message}`)
            await client.query('COMMIT')
            return null
        } finally {
            client.release()
        }
    }

    getAllTasksDB = async () => {
        const client = await pool.connect()
        try {
            const arrOfVal = (await client.query(`SELECT * FROM tasks`)).rows
            if (arrOfVal.length > 0) return arrOfVal
            else throw new ErrorHandler(500, 'Not found')
        } catch (err) {
            console.log(`Exception in getTaskById: ${err.message}`)
            return null
        } finally {
            client.release()
        }
    }
       
    getTaskById = async (id) => {
        const client = await pool.connect()
        try {
            const sql = 'SELECT * FROM tasks WHERE id = $1'
            const arrOfVal = (await client.query(sql, [id])).rows
            if (arrOfVal.length > 0) return arrOfVal
            else throw new ErrorHandler(500, 'Not found')
        } catch (err) {
            console.log(`Exception in getTaskById: ${err.message}`)
            return null
        } finally {
            client.release()
        }
    }

    updateTaskById = async (id, title, description) => {
        const client = await pool.connect()
        try {
            await client.query('BEGIN')
            const sql = 'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING tasks.*'
            const arrOfVal = (await client.query(sql, [title, description, id])).rows
            await client.query('COMMIT')
            if (arrOfVal.length > 0) return arrOfVal 
            else throw new ErrorHandler(500, 'Not found')
        } catch (err) {
            console.log(`Exception in updateTaskById: ${err.message}`)
            await client.query('COMMIT')
            return null
        } finally {
            client.release()
        }
    }

    deleteTaskById = async (id) => {
        const client = await pool.connect()
        try {
            await client.query('BEGIN')
            const sql =  'DELETE FROM tasks WHERE id = $1 RETURNING tasks.*'
            const arrOfVal = (await client.query(sql, [id])).rows
            await client.query('COMMIT')
            if (arrOfVal.length > 0) return arrOfVal 
            else throw new ErrorHandler(500, 'Not found')
        } catch (err) {
            console.log(`Exception in updateTaskById: ${err.message}`)
            await client.query('COMMIT')
            return null
        } finally {
            client.release()
        }
    }
}

module.exports = {Tasks}