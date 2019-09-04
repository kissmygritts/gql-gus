const { db } = require('./../db')

const findAll = repo => args => db.manyOrNone(repo.formatters.select(args))

const findBatch = repo => ({ table, field, ids }) =>
  db.manyOrNone(repo.formatters.findBatch({ table, field, ids }))

// const queriesWithRepo = repo => ({
//   findAll: findAll(repo),
//   findBatch: findBatch(repo)
// })

module.exports = {
  findAll,
  findBatch
}
