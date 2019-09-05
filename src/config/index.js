require('dotenv').config()

const environment = process.env.NODE_ENV || 'development'

exports.environment = environment

exports.pgsqlUri = environment === 'test'
  ? process.env.PGSQL_TEST : environment === 'production'
    ? process.env.PGSQL_PROD : process.env.PGSQL_DEV
