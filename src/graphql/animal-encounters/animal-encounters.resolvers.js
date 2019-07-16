const { db } = require('./../../db')
const { offsetPagination, sqlizeFilter } = require('./../../util')

module.exports = {
  Query: {
    allAnimalEncounters: async (parent, args, context, info) => {
      const { limit, filter } = args
      // console.log('log:', sqlizeFilter(filter))

      let sql = `
        select
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
      `

      return db.many('$/sql:raw/ $/where:raw/ $/pagination:raw/', {
        sql,
        where: sqlizeFilter(filter),
        pagination: offsetPagination(limit)
      })
    }
  }
}