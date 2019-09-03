const { db } = require('./../db')
const { AnimalEncounters } = require('./../db/repos')

module.exports = {
  all: (args) => db.any(AnimalEncounters.select(args))
}
