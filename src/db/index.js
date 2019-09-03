const promise = require('bluebird')
const pgPromise = require('pg-promise')
const monitor = require('pg-monitor')
const { pgsqlUri, environment } = require('./../config')

const initOptions = {
  promiseLib: promise
}

const pgp = pgPromise(initOptions)
const db = pgp(pgsqlUri)

if (environment === 'development') {
  // console.log(environment)
  // console.log(pgsqlUri)
  monitor.attach(initOptions)
}

module.exports = { db, pgp }
