const DataLoader = require('dataloader')
const { Vitals } = require('./../db/repos')

module.exports = {
  createOne: ({ input }) => Vitals.createOne(input),

  LoadVitalsAsChildProp: new DataLoader(async keys => {
    const data = await Vitals.findBatch({
      table: 'vitals',
      field: 'encounter_id',
      ids: keys
    })
    return keys.map(k => data.filter(o => o.encounter_id === k))
  })
}
