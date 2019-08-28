const { offsetPagination } = require('./offset-pagination')

const select = repo => args => {
  console.log(args)
  // return repo.pgp.as.format('select * from $/table/ limit 5', { table: repo.cs.table })
  const format = repo.pgp.as.format
  const { limit, filter } = args
  // const sql = 'select * from $/table/ $/where:raw/ $/pagination:raw/'
  const sql = 'select * from $/table/ $/pagination:raw/'

  return format(sql, {
    table: repo.cs.table,
    // where: sqlizeFilter(filter),
    pagination: offsetPagination(limit, repo.pgp)
  })
}

module.exports = {
  select
}
