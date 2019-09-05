const { Species } = require('./../db/repos')

module.exports = {
  findAll: args => Species.findAll(args),
  findById: args => Species.findById(args)
}
