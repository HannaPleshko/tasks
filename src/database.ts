import {config} from 'dotenv'
import {Pool, Client} from 'pg'

config({path: __dirname + '/../.env'})

const {USER_DB, HOST_DB, DATABASE, PASSWORD, PORT_DB} = process.env
const pool = new Pool({
  user: USER_DB,
  host: HOST_DB,
  database: DATABASE,
  password: PASSWORD,
  port: PORT_DB 
})
const client = new Client({
  user: USER_DB,
  host: HOST_DB,
  database: DATABASE,
  password: PASSWORD,
  port: PORT_DB 
})

export {pool, client}


