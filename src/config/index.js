require('dotenv').config()

const environment = process.env.NODE_ENV || 'development'
console.log(environment)

exports.environment

// exports.pgsqlUri = environment === 'test' ?
//   process.env.PGSQL_TEST : process.env.PGSQL_DEV
exports.pgsqlUri = environment === 'test' ?
  process.env.PGSQL_TEST : environment === 'production' ?
  process.env.PGSQL_PROD : process.env.PGSQL_DEV
