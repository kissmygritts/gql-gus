const { Repo } = require('./../../util/repo-factory')
const { sqlizeFilter, offsetPagination } = require('./../../util/pgsql-helpers')

const fields = [
  'animal_id',
  'species_id',
  'common_name',
  'species_name',
  'ind_id',
  'life_status',
  'age_class',
  'sex',
  'n',
  'reencounter',
  'relocation'
]
const table = 'animal_encounters'

const extend = repo => ({
  all: args => {
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
      $/where:raw/
      $/pagination:raw/
    `
    return repo.pgp.as.format(sql, {
      where: sqlizeFilter(args.filter),
      pagination: offsetPagination(args.limit)
    })
  }
})

const AnimalEncounterRepo = Repo({ fields, table })({ extend })
module.exports = AnimalEncounterRepo
