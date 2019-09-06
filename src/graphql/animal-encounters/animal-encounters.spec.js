const { makeExecutableSchema } = require('graphql-tools')
const { graphql } = require('graphql')
const { db, pgp } = require('./../../db')
const { typeDefs, resolvers } = require('./..')
const schema = makeExecutableSchema({ typeDefs, resolvers })

const species = require('./../../tests/species-fixture.json')
const animals = require('./../../tests/animal-fixture.json')
const encounters = require('./../../tests/encounter-fixture.json')
const events = require('./../../tests/event-fixture.json')

const gqlRunner = (query, variables) => {
  return graphql(schema, query, null, null, variables)
}

beforeAll(async () => {
  await db.any(pgp.helpers.concat([
    'truncate encounters restart identity cascade',
    'truncate events restart identity cascade',
    'truncate animals restart identity cascade',
    'truncate species restart identity cascade',
    pgp.helpers.insert(species, Object.keys(species[0]), 'species'),
    pgp.helpers.insert(events, Object.keys(events[0]), 'events'),
    pgp.helpers.insert(animals, Object.keys(animals[0]), 'animals'),
    pgp.helpers.insert(encounters, Object.keys(encounters[0]), 'encounters')
  ]))
})

afterAll(async () => {
  pgp.end()
})

const GET_ANIMAL_ENCOUNTERS = /* GraphQL */`
  query (
    $filter: AnimalEncounterFilterInput
    $limit: OffsetPaginationInput
  ) {
    getAnimalEncounters (
      filter: $filter
      limit: $limit
    ) {
      id
      common_name
      species_name
      ind_id
    }
  }
`

describe('getAnimalEncounter', () => {
  describe('without variables', () => {
    test('should return all results', async () => {
      const res = await gqlRunner(GET_ANIMAL_ENCOUNTERS, {})
      expect(res.data.getAnimalEncounters).toHaveLength(encounters.length)
    })
  })
})
