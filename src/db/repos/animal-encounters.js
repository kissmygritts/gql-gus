const { Repo } = require('./../../util/repo-factory')
const sql = require('./../sql').animalEncounters
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
  select: ({ filter, limit }) => repo.pgp.as.format(sql.all, {
    where: sqlizeFilter(filter),
    pagination: offsetPagination(limit)
  })
})

const AnimalEncounterRepo = Repo({ fields, table })({ extend })
module.exports = AnimalEncounterRepo
