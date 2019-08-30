const { findBatch } = require('./../../util/query-formatters')

// const cs = [
//   {
//     name: 'id'
//   }, {
//     name: 'encounter_id'
//   }, {
//     name: 'time_recorded'
//   }, {
//     name: 'heart_rate'
//   }, {
//     name: 'respiratory_rate'
//   }, {
//     name: 'temperature'
//   }
// ]

const VitalRepo = (db, pgp) => {
  this.db = db
  this.pgp = pgp

  return {
    findBatch: ({ ids }) => this.db.any(findBatch({
      table: 'vitals',
      field: 'encounter_id',
      ids
    }))
  }
}
module.exports = VitalRepo
