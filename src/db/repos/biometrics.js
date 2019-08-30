// const { pgp } = require('pg-promise')
// const sql = require('../sql').marks
// const { findBatch } = require('./../../util/query-formatters')
const { Repo } = require('./../../util/repo-factory')

const fields = [{
  name: 'encounter_id'
}, {
  name: 'measurement'
}, {
  name: 'value'
}, {
  name: 'units',
  def: null
}]
const table = 'biometrics'

// const cs = new pgp.helpers.ColumnSet(fields, { table: table })

// const BiometricRepo = (db, pgp) => {
//   this.db = db
//   this.pgp = pgp

//   return {
//     // query runners
//     all: (args) => this.db.any(sql.all),
//     findBatch: ({ ids }) => this.db.any(findBatch({
//       table: 'biometrics',
//       field: 'encounter_id',
//       ids
//     })),

//     create: ({ input }) => this.db.oneOrNone(
//       pgp.helpers.insert(input, cs) + ' returning *'
//     ),

//     // utilities
//     cs
//   }
// }

const BiometricRepo = Repo({ fields, table })
console.log(BiometricRepo)
module.exports = BiometricRepo
