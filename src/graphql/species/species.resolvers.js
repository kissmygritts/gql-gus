const { db } = require('./../../db')
// const { offsetPagination, sqlizeFilter } = require('./../../util')

module.exports = {
  Query: {
    getSpecies: async (parent, args, context, info) => {
      return db.any(db.species.select(args))
    },

    getSpeciesById: async (parent, args, context, info) => {
      return db.oneOrNone(db.species.find(args))
    }
  }
}
