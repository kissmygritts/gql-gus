const { db } = require('./../../db')
const { offsetPagination, sqlizeFilter } = require('./../../util')

module.exports = {
  Query: {
    species: async (parent, args, context, info) => {
      const { limit, filter } = args
      const sql = 'select id, common_name, species_name, subspecies from species'
      
      return db.many('$/sql:raw/ $/where:raw/ $/pagination:raw/', {
        sql,
        where: sqlizeFilter(filter),
        pagination: offsetPagination(limit)
      })
    }
  }
}
