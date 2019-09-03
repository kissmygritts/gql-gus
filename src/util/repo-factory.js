const pgp = require('pg-promise')()
const { pipe } = require('./index')
const { select, find, createOne, findBatch } = require('./query-formatters')

const withPgpContext = ({ pgp }) => repo => ({
  ...repo,
  pgp
})

const withColumnSet = ({ fields, table }) => repo => ({
  ...repo,
  cs: new pgp.helpers.ColumnSet(fields, { table: { table } })
})

const withQueryFormatters = () => repo => ({
  ...repo,
  select: select(repo),
  find: find(repo),
  createOne: createOne(repo),
  findBatch: findBatch(repo)
})

const initRepo = ({ fields, table }) => ({ db, pgp }) => {
  return pipe(
    withPgpContext({ db, pgp }),
    withColumnSet({ fields, table }),
    withQueryFormatters()
  )({})
}

const extendRepo = ({ extend }) => repo => ({
  ...repo,
  ...extend(repo)
})

const Repo = ({ fields, table }) => ({ extend }) => ({ pgp }) => {
  return pipe(
    withPgpContext({ pgp }),
    withColumnSet({ fields, table }),
    withQueryFormatters(),
    extendRepo({ extend })
  )({})
}

module.exports = {
  initRepo,
  Repo
}
