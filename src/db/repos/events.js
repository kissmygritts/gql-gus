const { Repo } = require('./../../util/repo-factory')

const fields = [
  'activity_id',
  'event_start_timestamp',
  'event_end_timestamp',
  'event_type',
  'x',
  'y',
  'datum',
  'comments',
  'observer',
  'source_app'
]

const table = 'events'

const extend = repo => ({})

const EventRepo = Repo({ fields, table })({ extend })
module.exports = EventRepo
