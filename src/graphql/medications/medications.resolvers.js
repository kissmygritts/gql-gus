const medications = require('./../../services/medications')

module.exports = {
  Mutation: {
    createMedication: (parent, args, context, info) => medications.createOne(args)
  }
}
