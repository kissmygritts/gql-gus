const DataLoader = require('dataloader')
const { Samples } = require('./../db/repos')

module.exports = {
  createOne: ({ input }) => Samples.createOne(input),

  LoadSamplesAsChildProp: new DataLoader(async keys => {
    const data = await Samples.findBatch({
      table: 'samples',
      field: 'encounter_id',
      ids: keys
    })
    return keys.map(k => data.filter(o => o.encounter_id === k))
  })
}
