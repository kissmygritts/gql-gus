const sql = require('../sql').marks
const { findBatch } = require('./../../util/query-formatters')

const BiometricRepo = (db, pgp) => {
  this.db = db
  this.pgp = pgp

  return {
    all: (args) => this.db.any(sql.all),
    findBatch: ({ ids }) => this.db.any(findBatch({
      table: 'biometrics',
      field: 'encounter_id',
      ids
    }))
  }
}

module.exports = BiometricRepo
