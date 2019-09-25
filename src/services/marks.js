const DataLoader = require('dataloader')
const { Marks } = require('./../db/repos')

module.exports = {
  createOne: ({ input }) => Marks.createOne(input),

  LoadMarksAsChildProp: new DataLoader(async keys => {
    // console.log(keys)
    const data = await Marks.findBatch({
      table: 'marks',
      field: 'animal_id',
      ids: keys
    })
    return keys.map(k => data.filter(o => o.animal_id === k))
  })
}
