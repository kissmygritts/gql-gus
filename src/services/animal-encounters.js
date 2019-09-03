const { db } = require('./../db')
const { AnimalEncounters } = require('./../db/repos')

module.exports = {
  all: (args) => {
    console.log(AnimalEncounters)
    const query = AnimalEncounters.all(args)
    return db.any(query)
  }
}
