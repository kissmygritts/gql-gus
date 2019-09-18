const pgp = require('pg-promise')()
const { pipe } = require('./index')
const { select, findById, createOne, findBatch } = require('./query-formatters')
const queryRunners = require('./query-runners')

const withPgpContext = ({ db, pgp }) => repo => ({
  ...repo,
  db,
  pgp
})

const withColumnSet = ({ fields, table }) => repo => ({
  // a ColumnSet isn't always needed when the repo is initialized
  // TODOD: find a way to set { fields, table } as optional,
  // if not provided return an empy object?
  ...repo,
  cs: new pgp.helpers.ColumnSet(fields, { table: { table } })
})

const withQueryFormatters = () => repo => ({
  ...repo,
  formatters: {
    select: select(repo),
    findById: findById(repo),
    createOne: createOne(repo),
    findBatch: findBatch(repo)
  }
})

const withQueryRunners = () => repo => ({
  ...repo,
  createOne: queryRunners.createOne(repo),
  findAll: queryRunners.findAll(repo),
  findBatch: queryRunners.findBatch(repo),
  findById: queryRunners.findById(repo)
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

const Repo = ({ fields, table }) => ({ extend }) => ({ db, pgp }) => {
  return pipe(
    withPgpContext({ db, pgp }),
    withColumnSet({ fields, table }),
    withQueryFormatters(),
    withQueryRunners(),
    extendRepo({ extend })
  )({})
}

module.exports = {
  initRepo,
  Repo
}
