const { db } = require('./../../db')

module.exports = {
  Query: {
    getVitals: (parent, args, context, info) => db.vitals.selectAll(args)
  }
}
