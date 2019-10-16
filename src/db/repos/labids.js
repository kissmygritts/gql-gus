const { Repo } = require('./../../util/repo-factory')

const fields = [
  'encounter_id',
  'labid'
]
const table = 'labids'
const extend = repo => ({})

const LabidRepo = Repo({ fields, table })({ extend })
module.exports = LabidRepo
