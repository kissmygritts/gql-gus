const { AnimalEncounters } = require('./../db/repos')

module.exports = {
  all: (args) => AnimalEncounters.findAll(args)
}
