const { findBatch } = require('./../../util/query-formatters')

// const cs = [
//   {
//     name: 'id'
//   }, {
//     name: 'encounter_id'
//   }, {
//     name: 'n_samples'
//   }, {
//     name: 'notes'
//   }
// ]

const SampleRepo = (db, pgp) => {
  this.db = db
  this.pgp = pgp

  return {
    findBatch: ({ ids }) => this.db.any(findBatch({
      table: 'samples',
      field: 'encounter_id',
      ids
    }))
  }
}

module.exports = SampleRepo
