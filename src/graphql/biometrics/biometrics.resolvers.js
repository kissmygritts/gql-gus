const { db } = require('./../../db')

module.exports = {
  Query: {
    getAllBiometrics: (parent, args, context, info) => db.biometrics.all()
  }
}
