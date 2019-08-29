const sql = require('../sql').marks

const MarkRepo = (db, pgp) => {
  this.db = db
  this.pgp = pgp

  return {
    findBatch: (ids) => this.db.any(sql.findBatch, ids)
  }
}

module.exports = MarkRepo
