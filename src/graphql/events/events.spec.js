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

const EVENTS_QUERY = /* GraphQL */`
  query {
    allEvents {
      id
      event_type
      source_app
    }
  }
`

const EVENTS_QUERY_WITH_FILTER = /* GraphQL */`
  query {
    allEvents (
      filter: { source_app: { eq: "captures" } }
    ) {
      id
      event_type
      source_app
    }
  }
`

const EVENTS_QUERY_WITH_PAGINATION = /* GraphQL */`
  query {
    allEvents (
      limit: { first: 1 }
    ) {
      id
      event_type
      source_app
    }
  }
`

describe('events query', () => {
  describe('without variables', () => {
    test('response should contain data', async () => {
      const response = await gqlRunner(EVENTS_QUERY, {})
      expect(response).toHaveProperty('data')
    })

    test('response does not contain error property', async () => {
      const response = await gqlRunner(EVENTS_QUERY, {})
      expect(response).not.toHaveProperty('errors')
    })
  })

  describe('with filter variables', () => {
    test('response should return data without an error property', async () => {
      const response = await gqlRunner(EVENTS_QUERY_WITH_FILTER, {})
      expect(response).toHaveProperty('data')
      expect(response).not.toHaveProperty('errors')
      expect(response.data.allEvents.length).toBeGreaterThan(0)
    })
  })

  describe('with pagination variables', () => {
    test('should return array of lenght 1 with limit input', async () => {
      const response = await gqlRunner(EVENTS_QUERY_WITH_PAGINATION, {})
      expect(response).toHaveProperty('data')
      expect(response).not.toHaveProperty('errors')
      expect(response.data.allEvents.length).toBe(1)
    })
  })
})
