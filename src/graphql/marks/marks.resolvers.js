const marks = require('./../../services/marks')

module.exports = {
  Mutation: {
    createMark: (parent, args, context, info) => marks.createOne(args)
  }
}
