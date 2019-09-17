const { Repo } = require('./../../util/repo-factory')
const sql = require('./../sql').observationFeed
const { offsetPagination } = require('./../../util/pgsql-helpers')

const fields = []
const table = 'observation-feed'

const extend = repo => ({
  findAll: ({ limit }) => {
    return repo.db.manyOrNone(sql.all, {
      pagination: offsetPagination(limit)
    })
  }

})

const ObservationFeedRepo = Repo({ fields, table })({ extend })
module.exports = ObservationFeedRepo
