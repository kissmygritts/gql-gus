const samples = require('./../../services/samples')

module.exports = {
  Mutation: {
    createSample: (parent, args, context, info) => samples.createOne(args)
  }
}
