const { QueryFile } = require('pg-promise')
const path = require('path')

module.exports = {
  animalEncounters: {
    all: sql('animal-encounters/all.sql')
  },
  biometrics: {
    all: sql('biometrics/all.sql'),
    findBatch: sql('biometrics/find-batch.sql')
  },
  marks: {
    findBatch: sql('marks/find-batch.sql')
  }
}

function sql (file) {
  const fullPath = path.join(__dirname, file)
  const options = {
    minify: true
  }
  const qf = new QueryFile(fullPath, options)
  if (qf.error) {
    console.error(qf.error)
  }

  return qf
}
