const observationFeed = require('./../../services/observation-feed')

module.exports = {
  // Query: {
  //   getObservationFeed: async (parent, args, context, info) => {
  //     const { limit, filter } = args

  //     return db.manyOrNone('$/sql:raw/ $/where:raw/ $/pagination:raw/', {
  //       sql: 'select * from wildlife_events_feed',
  //       where: sqlizeFilter(filter),
  //       pagination: offsetPagination(limit)
  //     })
  //   }
  // },

  // WildlifeEvent: {
  //   wildlife_encounters: (parent, args, context, info) => {
  //     return parent.wildlife_encounters
  //   },
  //   wildlife_abundance: (parent, args, context, info) => {
  //     return parent.wildlife_abundance
  //   }
  // }
  Query: {
    getObservationFeed: async (parent, args, context, info) => observationFeed.all(args)
  },

  ObservationFeed: {
    encounters_observation_feed: (parent, args, context, info) => parent.encounters
  }
}
