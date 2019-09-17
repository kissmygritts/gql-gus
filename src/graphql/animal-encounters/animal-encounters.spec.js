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

  describe('with limit variable', () => {
    test('first: 1 returns one result', async () => {
      const res = await gqlRunner(GET_ANIMAL_ENCOUNTERS, {
        limit: { first: 1 }
      })
      expect(res.data.getAnimalEncounters).toHaveLength(1)
    })

    test('if first is negative, return error', async () => {
      const res = await gqlRunner(GET_ANIMAL_ENCOUNTERS, {
        limit: { first: -1 }
      })
      expect(res).toHaveProperty('errors')
    })

    test('offset: 1 returns all but 1 record', async () => {
      const res = await gqlRunner(GET_ANIMAL_ENCOUNTERS, {
        limit: { offset: 1 }
      })
      expect(res.data.getAnimalEncounters).toHaveLength(encounters.length - 1)
    })

    test('if offset is negative, return error', async () => {
      const res = await gqlRunner(GET_ANIMAL_ENCOUNTERS, {
        limit: { offset: -1 }
      })
      expect(res).toHaveProperty('errors')
    })
  })

  describe('with filter variables', () => {
    describe('common name', () => {
      test('like %lk', async () => {
        const params = {
          filter: {
            common_name: {
              like: '%lk'
            }
          }
        }
        const res = await gqlRunner(GET_ANIMAL_ENCOUNTERS, params)
        expect(res.data.getAnimalEncounters).toHaveLength(encounters.length)
      })

      test('equals elk', async () => {
        const params = {
          filter: {
            common_name: {
              eq: 'elk'
            }
          }
        }
        const res = await gqlRunner(GET_ANIMAL_ENCOUNTERS, params)
        expect(res.data.getAnimalEncounters).toHaveLength(encounters.length)
      })
    })

    describe('species name', () => {
      test('like Cervus', async () => {
        const params = {
          filter: {
            species_name: {
              like: '%Cervus%'
            }
          }
        }
        const res = await gqlRunner(GET_ANIMAL_ENCOUNTERS, params)
        expect(res.data.getAnimalEncounters[0]).toHaveProperty('species_name', 'Cervus canadensis')
      })

      test('like is case-sensitive, cervus vs Cervus', async () => {
        const params = {
          filter: {
            species_name: {
              like: '%cervus%'
            }
          }
        }
        const res = await gqlRunner(GET_ANIMAL_ENCOUNTERS, params)
        expect(res.data.getAnimalEncounters).toHaveLength(0)
      })
    })
  })
})
