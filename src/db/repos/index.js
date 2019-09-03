// const { initRepo } = require('../../util/repo-factory')
// const species = require('./species')
const { pgp } = require('./../index')
const BiometricRepo = require('./biometrics')
const AnimalEncounterRepo = require('./animal-encounters')

module.exports = {
  AnimalEncounters: AnimalEncounterRepo({ pgp }),
  Biometrics: BiometricRepo({ pgp })
  // Marks: require('./marks'),
  // Medications: require('./medications'),
  // Samples: require('./samples'),
  // Vitals: require('./vitals'),
  // Species: initRepo({ fields: species.fields, table: species.table })
}
