const { db } = require('./../../db')
const { offsetPagination, sqlizeFilter } = require('./../../util')

module.exports = {
  Query: {
    observationFeed: async (parent, args, context, info) => {
      const { limit, filter } = args

      return db.manyOrNone('$/sql:raw/ $/where:raw/ $/pagination:raw/', {
        sql: 'select * from wildlife_events_feed',
        where: sqlizeFilter(filter),
        pagination: offsetPagination(limit)
      })
    }
  },

  WildlifeEvent: {
    wildlife_encounters: (parent, args, context, info) => {
      return parent.wildlife_encounters
    },
    wildlife_abundance: (parent, args, context, info) => {
      return parent.wildlife_abundance
    }
  }
}
