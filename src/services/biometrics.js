const DataLoader = require('dataloader')
const { db } = require('./../db')
const { Biometrics } = require('./../db/repos')

// here is an example of using the initialized repo in
// as service that is called from the resolver
// resolver > service > repo(db)
// what do I want the repo to be able to do?
// do I extend the repo here?
// what is the service layer?

module.exports = {
  createOne: ({ input }) => db.oneOrNone(Biometrics.createOne(input)),
  LoadBiometricsAsChildProp: new DataLoader(async keys => {
    // const query = Biometrics.findBatch({
    //   table: 'biometrics',
    //   field: 'encounter_id',
    //   ids: keys
    // })
    // const data = await db.any(query)
    const data = await Biometrics.findBatch({
      table: 'biometrics',
      field: 'encounter_id',
      ids: keys
    })
    return keys.map(k => data.filter(o => o.encounter_id === k))
  })
}
