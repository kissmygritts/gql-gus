const { findBatch } = require('./../../util/query-formatters')
// const cs = [
//   {
//     name: 'id'
//   }, {
//     name: 'encounter_id'
//   }, {
//     name: 'medication'
//   }, {
//     name: 'med_time'
//   }, {
//     name: 'med_dose'
//   }, {
//     name: 'med_unit'
//   }, {
//     name: 'med_method'
//   }, {
//     name: 'med_notes'
//   }
// ]

const MedicationRepo = (db, pgp) => {
  this.db = db
  this.pgp = pgp

  return {
    findBatch: ({ ids }) => this.db.any(findBatch({
      table: 'medications',
      field: 'encounter_id',
      ids
    }))
  }
}

module.exports = MedicationRepo
