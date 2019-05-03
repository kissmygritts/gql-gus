const { makeExecutableSchema } = require('graphql-tools')
const { graphql } = require('graphql')
const { pgp } = require('./../../db')
const { typeDefs, resolvers } = require('./..')

const schema = makeExecutableSchema({ typeDefs, resolvers })
const gqlRunner = (query, variables) => {
  return graphql(schema, query, null, {}, variables)
}

const SPECIES_QUERY = /* GraphQL */`
  query {
    species {
      id
      common_name
      species_name
      subspecies
    }
  }
`
const SPECIES_QUERY_FILTER = /* GraphQL */`
    query {
      species (
        filter: {
          common_name: { like: "%deer%" }
        }
      ){
        common_name
        species_name
        id
      }
    }
  `

const SPECIES_QUERY_LIMIT = /* GraphQL */`
    query {
      species (
        limit: { first: 2 }
      ){
        common_name
        species_name
        id
      }
    }
  `

afterAll(() => {
  return pgp.end()
})

describe('species query', () => {
  test('should return data without any args', async () => {
    const response = await gqlRunner(SPECIES_QUERY, {})
    expect(response).toHaveProperty('data')
  })

  test('data.species should be an array', async () => {
    const response = await gqlRunner(SPECIES_QUERY, {})
    expect(response.data.species).toBeInstanceOf(Array)
  })

  test('data.species[0] should have subspecies property', async () => {
    const response = await gqlRunner(SPECIES_QUERY, {})
    expect(response.data.species[0]).toHaveProperty('subspecies')
  })
})

describe('species query: filter', () => {
  test('should return data with filter argument', async () => {
    const response = await gqlRunner(SPECIES_QUERY_FILTER, {})
    expect(response).toHaveProperty('data')
  })

  test(`filter: { common_name: { like: "%deer%" } } returns 8 records'`, async () => {
    const response = await gqlRunner(SPECIES_QUERY_FILTER, {})
    expect(response.data.species).toHaveLength(8)
  })
})

describe('species query: limit', () => {
  test('should return data with limit argument', async () => {
    const response = await gqlRunner(SPECIES_QUERY_LIMIT, {})
    expect(response).toHaveProperty('data')
  })

  test('limit: { first: 2 } returns 2 records', async () => {
    const response = await gqlRunner(SPECIES_QUERY_LIMIT, {})
    expect(response.data.species).toHaveLength(2)
  })
})