/*
The repo pattern used here takes care of all the logic required to
make a call to the database. The repo will run the actual queries
against the database, and return results (not just formatted queries).

The repo will be bootstrapped using the Repo constructor function.
This function adds some standard queries, query formatters, etc to
the repo.

If any other data access logic needs to be added to the repo, add
it to an option extend function, which returns an object of functions
with the required data access logic.
*/

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
const extend = repo => ({})

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

const BiometricRepo = Repo({ fields, table })({ extend: extend })
module.exports = BiometricRepo
