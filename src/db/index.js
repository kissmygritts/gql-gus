const promise = require('bluebird')
const initOptions = { promiseLib: promise }
const pgp = require('pg-promise')(initOptions)
const monitor = require('pg-monitor')

monitor.attach(initOptions)

exports.db = pgp('postgres://localhost/gus_dev')
exports.pgp = pgp
