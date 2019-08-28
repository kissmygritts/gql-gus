const { initRepo } = require('../../util/repo-factory')
const species = require('./species')

module.exports = {
  // Biometrics: require('./biometrics'),
  Vitals: require('./vitals'),
  // Samples: require('./samples'),
  // Medications: require('./medications'),
  Species: initRepo({ fields: species.fields, table: species.table })
}
