const { db } = require('./../../db')
const species = require('./../../services/species')

module.exports = {
  Query: {
    getSpecies: async (parent, args, context, info) => species.findAll(args),

    getSpeciesById: async (parent, args, context, info) => {
      return db.oneOrNone(db.species.find(args))
    }
  }
}
