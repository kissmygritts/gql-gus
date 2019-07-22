const DataLoader = require('dataloader')
const { db, pgp } = require('./../../db')
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
    getActivityByID: async (parent, args, context, info) => {
      const { id } = args
      return db.oneOrNone(`
        select 
          id,
          activity_name,
          activity_type,
          created_at
        from activities
        where id = $1
      `, id)
    },
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

  Mutation: {
    createActivity: async (parent, args, context, info) => {
      const { input } = args
      return db.oneOrNone(`
        insert into activities
          ($/this:name/)
        values
          ($/this:csv/)
        returning *
      `, input)
    },

    updateActivityByID: async (parent, args, context, info) => {
      return db.oneOrNone(`
        $/sql:raw/
        where id = $/id/
        returning *
      `, {
        sql: pgp.helpers.update(args.update, null, 'activities'),
        id: args.id
      })
    },

    deleteActivityByID: async (parent, args, context, info) => {
      const { id } = args

      return db.oneOrNone(`
        delete
        from activities
        where id = $1
        returning *
      `, id)
    }
  },

  // field resolvers
  Activity: {
    events: async (parent, args, context, info) => {
      return EventsLoader.load(parent.id)
    }
  }
}
