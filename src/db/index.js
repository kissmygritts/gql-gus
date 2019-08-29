const promise = require('bluebird')
const pgPromise = require('pg-promise')
const monitor = require('pg-monitor')
const { pgsqlUri, environment } = require('./../config')
const {
  AnimalEncounters,
  Biometrics,
  Marks,
  Medications,
  Samples,
  Vitals
} = require('./repos')
const repos = require('./repos')

const initOptions = {
  promiseLib: promise,
  extend (obj, dc) {
    obj.animalEncounters = AnimalEncounters(obj, pgp)
    obj.biometrics = Biometrics(obj, pgp)
    obj.marks = Marks(obj, pgp)
    obj.medications = Medications(obj, pgp)
    obj.vitals = Vitals(obj, pgp)
    obj.samples = Samples(obj, pgp)
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

module.exports = { db, pgp }
