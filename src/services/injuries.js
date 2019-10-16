const DataLoader = require('dataloader')
const { Injuries } = require('./../db/repos')

module.exports = {
  LoadInjuriesAsChildProp: new DataLoader(async keys => {
    const data = await Injuries.findBatch({
      table: 'injuries',
      field: 'encounter_id',
      ids: keys
    })
    return keys.map(k => data.filter(o => o.encounter_id === k))
  })
}
