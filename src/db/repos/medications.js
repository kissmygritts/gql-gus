const { Repo } = require('./../../util/repo-factory')

const fields = [
  {
    name: 'encounter_id'
  }, {
    name: 'medication'
  }, {
    name: 'med_time',
    def: null
  }, {
    name: 'med_dose',
    def: null
  }, {
    name: 'med_unit',
    def: null
  }, {
    name: 'med_method',
    def: null
  }, {
    name: 'med_notes',
    def: null
  }
]
const table = 'medications'
const extend = repo => ({})

const MedicationRepo = Repo({ fields, table })({ extend })
module.exports = MedicationRepo
