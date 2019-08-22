const promise = require('bluebird')
const pgPromise = require('pg-promise')
const monitor = require('pg-monitor')
const { pgsqlUri, environment } = require('./../config')
const {
  Biometrics,
  Vitals,
  Samples
} = require('./repos')

const initOptions = {
  promiseLib: promise,
  extend (obj, dc) {
    obj.biometrics = new Biometrics(obj, pgp)
    obj.vitals = new Vitals(obj, pgp)
    obj.samples = new Samples(obj, pgp)
  }
}

const pgp = pgPromise(initOptions)

if (environment === 'development') {
  console.log(environment)
  console.log(pgsqlUri)
  monitor.attach(initOptions)
}

exports.db = pgp(pgsqlUri)
exports.pgp = pgp
