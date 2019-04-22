const { db } = require('./../../db')

module.exports = {
  Query: {
    species: async () => {
      return db.many('select id, common_name, species_name, subspecies from species limit 5')
    }
  }
}
