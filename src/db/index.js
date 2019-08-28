const promise = require('bluebird')
const pgPromise = require('pg-promise')
const monitor = require('pg-monitor')
const { pgsqlUri, environment } = require('./../config')
const {
//   Biometrics,
  Vitals
//   Samples,
//   Medications
} = require('./repos')
const repos = require('./repos')

const initOptions = {
  promiseLib: promise,
  extend (obj, dc) {
    // obj.biometrics = new Biometrics(obj, pgp)
    obj.vitals = new Vitals(obj, pgp)
    // obj.samples = new Samples(obj, pgp)
    // obj.medications = new Medications(obj, pgp)
    obj.species = repos.Species({ db: obj, pgp })
  }
}

const pgp = pgPromise(initOptions)
const db = pgp(pgsqlUri)

if (environment === 'development') {
  console.log(environment)
  console.log(pgsqlUri)
  monitor.attach(initOptions)
}

console.log('from db index')

module.exports = { db, pgp }
