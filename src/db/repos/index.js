const { initRepo } = require('../../util/repo-factory')
const species = require('./species')
const BiometricRepo = require('./biometrics')

module.exports = {
  AnimalEncounters: require('./animal-encounters'),
  Marks: require('./marks'),
  Medications: require('./medications'),
  Biometrics: BiometricRepo,
  Samples: require('./samples'),
  Vitals: require('./vitals'),
  Species: initRepo({ fields: species.fields, table: species.table })
}
