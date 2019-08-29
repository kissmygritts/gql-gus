const findBatchSql = `select * from vitals where encounter_id in ($/ids:csv/)`

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
    findBatch: ids => this.db.any(findBatchSql, ids)
  }
}
module.exports = VitalRepo
