const { makeExecutableSchema } = require('graphql-tools')
const { graphql } = require('graphql')
const { pgp } = require('./../../db')
const { typeDefs, resolvers } = require('./..')

const schema = makeExecutableSchema({ typeDefs, resolvers })
const gqlRunner = (query, variables) => {
  return graphql(schema, query, null, {}, variables)
}

afterAll(() => {
  return pgp.end()
})

const FEED_QUERY = /* GraphQL */`
  query {
    observationFeed {
      common_name
      activity_name
    }
  }
`

const FEED_QUERY_WITH_FILTER = /* GraphQL */`
  query {
    observationFeed (
      filter: { common_name: { like: "%deer%" } }
    ) {
      common_name
      activity_name
    }
  }
`

const FEED_QUERY_WITH_PAGINATION = /* GraphQL */`
  query {
    observationFeed (
      limit: { first: 1 }
    ) {
      common_name
      activity_name
    }
  }
`

const FEED_QUERY_LOADS_CHILDREN = /* GraphQL */`
  query {
    observationFeed (
      limit: { first: 1 }
    ) {
      common_name
      activity_name
      wildlife_encounters {
        encounter_uuid
        life_status
        n
      }
    }
  }
`

describe('events query', () => {
  describe('without variables', () => {
    test('response should contain data', async () => {
      const response = await gqlRunner(FEED_QUERY, {})
      expect(response).toHaveProperty('data')
      expect(response).not.toHaveProperty('errors')
      expect(response.data.observationFeed.length).toBeGreaterThan(0)
    })
  })

  describe('with filter variables', () => {
    test('response should return data without an error property', async () => {
      const response = await gqlRunner(FEED_QUERY_WITH_FILTER, {})
      expect(response).toHaveProperty('data')
      expect(response).not.toHaveProperty('errors')
      expect(response.data.observationFeed.length).toBeGreaterThan(0)
    })
  })

  describe('with pagination variables', () => {
    test('should return array of lenght 1 with limit input', async () => {
      const response = await gqlRunner(FEED_QUERY_WITH_PAGINATION, {})
      expect(response).toHaveProperty('data')
      expect(response).not.toHaveProperty('errors')
      expect(response.data.observationFeed.length).toBe(1)
    })
  })

  describe('DataLoader implementation', () => {
    test('should return child node "wildlife_encounters"', async () => {
      const response = await gqlRunner(FEED_QUERY_LOADS_CHILDREN, {})
      expect(response).toHaveProperty('data')
      expect(response).not.toHaveProperty('errors')
      expect(response.data.observationFeed[0]).toHaveProperty('wildlife_encounters')
    })
  })
})
