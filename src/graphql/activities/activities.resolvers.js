const DataLoader = require('dataloader')
const { db } = require('./../../db')
const { offsetPagination, sqlizeFilter } = require('./../../util')

const EventsLoader = new DataLoader(async keys => {
  const sql = `
    select
      id,
      activity_id,
      event_start_timestamp,
      event_end_timestamp,
      event_type,
      comments,
      observer,
      source_app,
      created_at,
      updated_at
    from events
    where activity_id in ($/keys:csv/)
  `
  const data = await db.many(sql, { keys })
  return keys.map(k => data.filter(o => o.activity_id === k))
})

module.exports = {
  Query: {
    allActivities: async (parent, args, context, info) => {
      const { limit, filter } = args
      const sql = `
        select
          id, 
          activity_name,
          activity_type,
          created_at
        from activities
      `
      return db.many('$/sql:raw/ $/where:raw/ $/pagination:raw/', {
        sql,
        where: sqlizeFilter(filter),
        pagination: offsetPagination(limit)
      })
    }
  },

  // field resolvers
  Activity: {
    events: async (parent, args, context, info) => {
      return EventsLoader.load(parent.id)
    }
  }
}
