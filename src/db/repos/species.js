const { Repo } = require('./../../util/repo-factory')

const fields = [
  'common_name',
  'species_name',
  't_phylum',
  't_class',
  't_order',
  't_family',
  'genus',
  'species',
  'subspecies',
  'species_group'
]
const table = 'species'
const extend = repo => ({})

const SpeciesRepo = Repo({ fields, table })({ extend })
module.exports = SpeciesRepo
