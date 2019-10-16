const DataLoader = require('dataloader')
const { LabResults } = require('./../db/repos')

module.exports = {
  LoadLabResultsAsChildProp: new DataLoader(async keys => {
    const data = await LabResults.findBatch({ ...keys })
    return keys.map(k => data.filter(o => o.encounter_id === k))
  })
}
