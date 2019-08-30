const { findBatch } = require('./../../util/query-formatters')

const MarkRepo = (db, pgp) => {
  this.db = db
  this.pgp = pgp

  return {
    findBatch: ({ ids }) => this.db.any(findBatch({
      table: 'marks',
      field: 'animal_id',
      ids
    }))
  }
}

module.exports = MarkRepo
