const DataLoader = require('dataloader')
const { AnimalEncounters } = require('./../db/repos')

module.exports = {
  all: (args) => AnimalEncounters.findAll(args),

  LoaderAnimalEncountersAsChildProp: new DataLoader(async keys => {
    const data = await AnimalEncounters.findBatch(keys)
    return keys.map(k => data.filter(o => o.event_id === k))
  })
}
