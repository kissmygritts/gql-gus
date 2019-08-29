const sql = require('../sql').marks

const BiometricRepo = (db, pgp) => {
  this.db = db
  this.pgp = pgp

  return {
    all: (args) => this.db.any(sql.all),
    findBatch: (ids) => this.db.any(sql.findBatch, ids)
  }
}

module.exports = BiometricRepo
