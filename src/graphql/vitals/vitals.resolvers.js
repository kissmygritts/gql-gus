const vitals = require('./../../services/vitals')

module.exports = {
  Mutation: {
    createVital: (parent, args, context, info) => vitals.createOne(args)
  }
}
