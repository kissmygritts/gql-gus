const { Repo } = require('./../../util/repo-factory')
const sql = require('./../sql').labResults

const fields = [
  'lab_id',
  'case_num',
  'spec_num',
  'specimenid',
  'specimen_location',
  'test',
  'results',
  'lvl',
  'isolate',
  'lab'
]
const table = 'lab_results'

const extend = repo => ({
  findBatch: async ids => {
    console.log(ids)
    return repo.db.manyOrNone(sql.findBatch, { ids })
  }
})

module.exports = Repo({ fields, table })({ extend })
