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

const BiometricRepo = Repo({ fields, table })({ extend: extend })
module.exports = BiometricRepo
