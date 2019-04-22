const promise = require('bluebird')
const initOptions = { promiseLib: promise }
const pgp = require('pg-promise')(initOptions)
const monitor = require('pg-monitor')
const { pgsqlUri, environment } = require('./../config')

if (environment === 'development') {
  monitor.attach(initOptions)
}

exports.db = pgp(pgsqlUri)
exports.pgp = pgp
