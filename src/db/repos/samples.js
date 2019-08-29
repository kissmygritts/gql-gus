const findBatchSql = `select * from samples where encounter_id in ($/ids:csv/)`

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
    findBatch: ids => this.db.any(findBatchSql, ids)
  }
}

module.exports = SampleRepo
