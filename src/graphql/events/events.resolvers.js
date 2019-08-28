const DataLoader = require('dataloader')
const { db } = require('./../../db')
const { offsetPagination, sqlizeFilter } = require('./../../util')

const animalEncounterLoader = new DataLoader(async keys => {
  const sql = `
    select
      encounters.event_id,
      animals.id as animal_id,
      encounters.id as encounter_id,
      species.id as species_id,
      species.common_name,
      species.species_name,
      animals.ind_id,
      encounters.life_status,
      encounters.age_class,
      encounters.sex,
      encounters.n,
      encounters.reencounter,
      encounters.relocation
    from animals
      right join encounters on animals.id = encounters.animal_id
      left join species on encounters.species_id = species.id
    where encounters.event_id in ($/keys:csv/)
  `
  // fetch data from db (async/await instead of promise)
  const data = await db.many(sql, { keys })
  // map returned data to the proper keys (required step for child loaders)
  return keys.map(k => data.filter(o => o.event_id === k))
})

module.exports = {
  Query: {
    getEvents: async (parent, args, context, info) => {
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
    },
    getEventById: async (parent, args, context, info) => {
      const { id } = args
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
        where id = $/id/
        `
      return db.oneOrNone(sql, { id })
    }
  },

  Event: {
    animal_encounters: async (parent, args, context, info) => {
      return animalEncounterLoader.load(parent.id)
    }
  }
}
