import knex from 'knex'
import config from './knexfile'

const configToUse = config[process.env.NODE_ENV || 'development']

const db = knex(configToUse)

export default db
