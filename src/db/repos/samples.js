const { Repo } = require('./../../util/repo-factory')
const fields = [
  {
    name: 'encounter_id'
  }, {
    name: 'sample'
  }, {
    name: 'n_samples',
    def: 1
  }, {
    name: 'notes',
    def: null
  }
]
const table = 'samples'
const extend = repo => ({})

const SampleRepo = Repo({ fields, table })({ extend })
module.exports = SampleRepo
