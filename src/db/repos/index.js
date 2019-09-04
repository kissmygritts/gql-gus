const { db, pgp } = require('./../index')
const BiometricRepo = require('./biometrics')
const AnimalEncounterRepo = require('./animal-encounters')

module.exports = {
  AnimalEncounters: AnimalEncounterRepo({ db, pgp }),
  Biometrics: BiometricRepo({ db, pgp })
  // Marks: require('./marks'),
  // Medications: require('./medications'),
  // Samples: require('./samples'),
  // Vitals: require('./vitals'),
  // Species: initRepo({ fields: species.fields, table: species.table })
}
