const species = [
  {
    id: 1,
    common_name: 'species 1',
    species_name: 'species name 1'
  },
  {
    id: 2,
    common_name: 'species 2',
    species_name: 'species name 2'
  },
  {
    id: 3,
    common_name: 'species 3',
    species_name: 'species name 3'
  }
]

module.exports = {
  Query: {
    species: () => {
      return species
    }
  }
}
