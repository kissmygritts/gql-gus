const { initRepo } = require('../../util/repo-factory')
const species = require('./species')

module.exports = {
  AnimalEncounters: require('./animal-encounters'),
  Marks: require('./marks'),
  Medications: require('./medications'),
  Biometrics: require('./biometrics'),
  Samples: require('./samples'),
  Vitals: require('./vitals'),
  Species: initRepo({ fields: species.fields, table: species.table })
}
