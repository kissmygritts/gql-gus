// const { db } = require('./../../db')
const biometrics = require('./../../services/biometrics')

module.exports = {
  Query: {
    getBiometrics: (parent, args, context, info) => biometrics.all()
  },

  Mutation: {
    createBiometric: (parent, args, context, info) => biometrics.createOne(args)
  }
}
