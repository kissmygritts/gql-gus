const findAll = repo => args =>
  repo.db.manyOrNone(repo.formatters.select(args))

const findBatch = repo => ({ table, field, ids }) =>
  repo.db.manyOrNone(repo.formatters.findBatch({ table, field, ids }))

const createOne = repo => data => {
  console.log(repo.formatters.createOne(data, repo.cs))
  return repo.db.oneOrNone(repo.formatters.createOne(data, repo.cs))
}

// const queriesWithRepo = repo => ({
//   findAll: findAll(repo),
//   findBatch: findBatch(repo)
// })

module.exports = {
  createOne,
  findAll,
  findBatch
}
