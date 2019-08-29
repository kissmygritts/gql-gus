const { pipe } = require('./index')
const { select, find } = require('./query-formatters')

const withPgpContext = ({ db, pgp }) => repo => ({
  ...repo,
  db,
  pgp
})

const withColumnSet = ({ fields, table }) => repo => ({
  ...repo,
  cs: repo.pgp.helpers.ColumnSet(fields, { table: { table: table } })
})

const withQueryFormatters = () => repo => ({
  ...repo,
  select: select(repo),
  find: find(repo)
})

const initRepo = ({ fields, table }) => ({ db, pgp }) => {
  return pipe(
    withPgpContext({ db, pgp }),
    withColumnSet({ fields, table }),
    withQueryFormatters()
  )({})
}

module.exports = {
  initRepo
}
