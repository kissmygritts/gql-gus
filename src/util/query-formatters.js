const format = require('pg-promise').as.format
const { sqlizeFilter, offsetPagination } = require('./pgsql-helpers')

const select = repo => args => {
  const format = repo.pgp.as.format
  const { limit, filter } = args
  const sql = 'select * from $/table/ $/where:raw/ $/pagination:raw/'

  return format(sql, {
    table: repo.cs.table,
    where: sqlizeFilter(filter),
    pagination: offsetPagination(limit, repo.pgp)
  })
}

const findById = repo => args => {
  const { id } = args
  const format = repo.pgp.as.format

  return format('select * from $/table/ where id = $/id/', {
    table: repo.cs.table,
    id
  })
}

const findBatch = repo => ({ table, field, ids }) => {
  // TODO: get table automatically, from the cs, using the repo? or
  // make it more specific and a facotry pattern... if(table != marks) ...etc?
  const sql = 'select * from $/table:name/ where $/field:name/ in ($/ids:csv/)'
  return format(sql, { table, field, ids })
}

const createOne = repo => data => {
  return repo.pgp.helpers.insert(data, repo.cs) + ' returning *'
}

module.exports = {
  select,
  findById,
  findBatch,
  createOne
}
