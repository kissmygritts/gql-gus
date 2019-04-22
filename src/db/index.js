const promise = require('bluebird')
const initOptions = { promiseLib: promise }
const pgp = require('pg-promise')(initOptions)
const monitor = require('pg-monitor')
const { pgsqlUri } = require('./../config')


monitor.attach(initOptions)
console.log(pgsqlUri)
exports.db = pgp(pgsqlUri)
exports.pgp = pgp
