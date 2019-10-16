const { Repo } = require('./../../util/repo-factory')

const fields = [
  'encounter_id',
  'injury_type',
  'injury_description',
  'injury_treatment'
]
const table = 'injuries'
const extend = repo => ({})

module.exports = Repo({ fields, table })({ extend })
