const DataLoader = require('dataloader')
const { Medications } = require('./../db/repos')

module.exports = {
  createOne: ({ input }) => Medications.createOne(input),

  LoadMedicationsAsChildProp: new DataLoader(async keys => {
    const data = await Medications.findBatch({
      table: 'medications',
      field: 'encounter_id',
      ids: keys
    })
    return keys.map(k => data.filter(o => o.encounter_id === k))
  })
}
