const { pipe } = require('./index')
const { select } = require('./query-formatters')

const withPgpContext = ({ db, pgp }) => repo => ({
  ...repo,
  db,
  pgp
})

const withColumnSet = ({ fields, table }) => repo => ({
  ...repo,
  cs: repo.pgp.helpers.ColumnSet(fields, { table: { table: table } })
})

const withSelect = () => repo => ({
  ...repo,
  select: select(repo)
})

const initRepo = ({ fields, table }) => ({ db, pgp }) => {
  return pipe(
    withPgpContext({ db, pgp }),
    withColumnSet({ fields, table }),
    withSelect()
  )({})
}

module.exports = {
  initRepo
}
