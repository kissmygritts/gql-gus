const species = require('./../../services/species')

module.exports = {
  Query: {
    getSpecies: async (parent, args, context, info) => species.findAll(args),
    getSpeciesById: async (parent, args, context, info) => species.findById(args)
  }
}
