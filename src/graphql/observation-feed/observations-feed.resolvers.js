const observationFeed = require('./../../services/observation-feed')

module.exports = {
  Query: {
    getObservationFeed: async (parent, args, context, info) => observationFeed.all(args)
  },

  ObservationFeed: {
    encounters_observation_feed: (parent, args, context, info) => parent.encounters
  }
}
