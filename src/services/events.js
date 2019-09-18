const { Events } = require('./../db/repos')

module.exports = {
  findById: (args) => Events.findById(args)
}
