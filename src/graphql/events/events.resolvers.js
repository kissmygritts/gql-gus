const { db } = require('./../../db')
const { offsetPagination, sqlizeFilter } = require('./../../util')

module.exports = {
  Query: {
    allEvents: async (parent, args, context, info) => {
      const { limit, filter } = args
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
      `
      return db.many('$/sql:raw/ $/where:raw/ $/pagination:raw/', {
        sql,
        where: sqlizeFilter(filter),
        pagination: offsetPagination(limit)
      })
    }
  }
}
