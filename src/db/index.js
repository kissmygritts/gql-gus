import promise from 'bluebird'

const initOptions = { promiseLib: promise }
const pgp = require('pg-promise')(initOptions)
const monitor = require('pg-monitor')

monitor.attach(initOptions)

export const db = pgp('postgres://localhost/gus_dev')
