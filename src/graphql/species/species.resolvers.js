const { db } = require('./../../db')
const { offsetPagination, sqlizeFilter } = require('./../../util')

module.exports = {
  Query: {
    species: async (parent, args, context, info) => {
      const { limit, filter } = args
      const sql = `
        select 
          id,
          common_name,
          species_name,
          t_phylum,
          t_class,
          t_order,
          t_family,
          genus,
          species,
          subspecies,
          species_group
        from species
      `

      return db.many('$/sql:raw/ $/where:raw/ $/pagination:raw/', {
        sql,
        where: sqlizeFilter(filter),
        pagination: offsetPagination(limit)
      })
    }
  }
}
