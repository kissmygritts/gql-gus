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

const GET_OBSERVATION_FEED = /* GraphQL */`
  query (
    $limit: OffsetPaginationInput
    $filter: ObservationFeedFilterInput
  ) {
    getObservationFeed (
      limit: $limit
      filter: $filter
    ) {
      id
      source_app
      encounters_observation_feed {
        ind_id
        common_name
        species_name
      }
    }
  }
`

describe('getObsevationFeed', () => {
  describe('without variables', () => {
    test('should return all results', async () => {
      const res = await gqlRunner(GET_OBSERVATION_FEED, {})
      expect(res.data.getObservationFeed).toHaveLength(events.length)
    })
  })

  describe('with limit variable', () => {
    test('first: 1 returns one result', async () => {
      const res = await gqlRunner(GET_OBSERVATION_FEED, {
        limit: { first: 1 }
      })
      expect(res.data.getObservationFeed).toHaveLength(1)
    })
  })

  describe('with filter variable', () => {
    test('common_name: like: %elk%', async () => {
      const res = await gqlRunner(GET_OBSERVATION_FEED, {
        filter: { common_name: { like: '%elk%' } }
      })
      expect(res.data.getObservationFeed[0].encounters_observation_feed[0]).toHaveProperty('common_name', 'elk')
    })
  })
})
