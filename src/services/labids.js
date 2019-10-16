const DataLoader = require('dataloader')
const { Labids } = require('./../db/repos')

module.exports = {
  LoadLabidsAsChildProp: new DataLoader(async keys => {
    const data = await Labids.findBatch({
      table: 'labids',
      field: 'encounter_id',
      ids: keys
    })
    return keys.map(k => data.filter(o => o.encounter_id === k))
  })
}
