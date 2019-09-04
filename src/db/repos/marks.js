const { Repo } = require('./../../util/repo-factory')

const fields = [{
  name: 'animal_id'
}, {
  name: 'mark_id'
}, {
  name: 'mark_type'
}, {
  name: 'mark_color',
  def: null
}, {
  name: 'mark_location'
}, {
  name: 'notes',
  def: null
}]
const table = 'marks'
const extend = repo => ({})

const MarkRepo = Repo({ fields, table })({ extend })

module.exports = MarkRepo
