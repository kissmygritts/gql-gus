const { Species } = require('./../db/repos')

module.exports = {
  findAll: args => Species.findAll(args)
}
