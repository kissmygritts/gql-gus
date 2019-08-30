const { db } = require('./../db')

// here is an example of using the initialized repo in
// as service that is called from the resolver
// resolver > service > repo(db)
// what do I want the repo to be able to do?
// do I extend the repo here?
// what is the service layer?

module.exports = {
  createOne: ({ input }) => db.oneOrNone(db.biometrics.createOne(input))
}
