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
    }
  }
`

afterAll(() => {
  return pgp.end()
})

describe('species', () => {
  test('SPECIES_QUERY should return data', async () => {
    const response = await gqlRunner(SPECIES_QUERY, {})
    expect(response).toHaveProperty('data')
  })

  test('data.species should be array', async () => {
    const response = await gqlRunner(SPECIES_QUERY, {})
    expect(response.data.species).toBeInstanceOf(Array)
  })
})
