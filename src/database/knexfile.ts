import dotenv from 'dotenv'
import type { Knex } from 'knex'
// import { attachPaginate } from 'knex-paginate'
// attachPaginate()

dotenv.config({ path: '../../.env' })
console.log('>>>>> ', process.env.DATABASE_NAME)

// Update with your config settings.
const config: { [key: string]: Knex.Config } = {
 development: {
  client: 'pg',
  debug: true,
  useNullAsDefault: true,
  connection: {
   database: process.env.DATABASE_NAME,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
  },
  pool: {
   min: 2,
   max: 10,
  },
  migrations: {
   tableName: 'knex_migrations',
   extension: 'ts',
   directory: './migrations',
  },
 },

 test: {
  client: 'pg',
  connection: {
   database: process.env.TEST_DATABASE,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
  },
  pool: {
   min: 2,
   max: 10,
  },
  migrations: {
   tableName: 'knex_migrations',
  },
 },

 staging: {
  client: 'pg',
  connection: {
   database: process.env.DATABASE_NAME,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
  },
  pool: {
   min: 2,
   max: 10,
  },
  migrations: {
   tableName: 'knex_migrations',
  },
 },

 production: {
  client: 'pg',
  connection: {
   database: process.env.DATABASE_NAME,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
  },
  pool: {
   min: 2,
   max: 10,
  },
  migrations: {
   tableName: 'knex_migrations',
  },
 },
}

export default config
