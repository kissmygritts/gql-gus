const { db } = require('./../../db')

module.exports = {
  Query: {
    getBiometrics: (parent, args, context, info) => db.biometrics.all()
  }
}
