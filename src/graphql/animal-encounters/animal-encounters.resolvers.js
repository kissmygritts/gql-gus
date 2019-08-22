const DataLoader = require('dataloader')
const { db } = require('./../../db')
const { offsetPagination, sqlizeFilter } = require('./../../util')

const marksLoader = new DataLoader(async keys => {
  const sql = `
    select
      id,
      animal_id,
      mark_id,
      mark_type,
      mark_color,
      mark_location,
      notes,
      created_at,
      updated_at
    from marks
    where animal_id in ($/keys:csv/)
  `
  const data = await db.manyOrNone(sql, { keys })
  return keys.map(k => data.filter(o => o.animal_id === k))
})

const biometricLoader = new DataLoader(async keys => {
  const data = await db.biometrics.findByEncounterIds({ ids: keys })
  return keys.map(k => data.filter(o => o.encounter_id === k))
})

const vitalLoader = new DataLoader(async keys => {
  const data = await db.vitals.findByEncounterIds({ ids: keys })
  return keys.map(k => data.filter(o => o.encounter_id === k))
})

const sampleLoader = new DataLoader(async keys => {
  const data = await db.samples.findByEncounterIds({ ids: keys })
  return keys.map(k => data.filter(o => o.encounter_id === k))
})

module.exports = {
  Query: {
    allAnimalEncounters: async (parent, args, context, info) => {
      const { limit, filter } = args
      const sql = `
        select
          encounters.id as id,
          animals.id as animal_id,
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
      `
      return db.many('$/sql:raw/ $/where:raw/ $/pagination:raw/', {
        sql,
        where: sqlizeFilter(filter),
        pagination: offsetPagination(limit)
      })
    }
  },

  AnimalEncounter: {
    marks: async (parent, args, context, info) => marksLoader.load(parent.animal_id),
    biometrics: async (parent, args, context, info) => biometricLoader.load(parent.id),
    vitals: async (parent, args, context, info) => vitalLoader.load(parent.id),
    samples: async (parent, args, context, info) => sampleLoader.load(parent.id)
  }
}
