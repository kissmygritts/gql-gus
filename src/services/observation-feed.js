const { ObservationFeed } = require('./../db/repos')

module.exports = {
  all: (args) => ObservationFeed.findAll(args)
}
