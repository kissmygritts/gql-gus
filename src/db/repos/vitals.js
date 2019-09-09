const { Repo } = require('./../../util/repo-factory')

const fields = [
  {
    name: 'encounter_id'
  }, {
    name: 'time_recorded',
    def: null
  }, {
    name: 'heart_rate',
    def: null
  }, {
    name: 'respiratory_rate',
    def: null
  }, {
    name: 'temperature',
    def: null
  }
]
const table = 'vitals'
const extend = repo => ({})

const VitalRepo = Repo({ fields, table })({ extend })
module.exports = VitalRepo
