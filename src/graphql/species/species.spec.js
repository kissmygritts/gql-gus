import { graphql } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'
import { typeDefs, resolvers } from '..'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const SPECIES_QUERY = /* GraphQL */`
  query {
    species {
      id
      common_name
      species_name
    }
  }
`

// a graphql query runner, this will call the graphql api
const gqlRunner = async (query, variables) => {
  return graphql(schema, query, null, {}, variables)
}

describe('Species', () => {
  it('return data', async () => {
    const response = await gqlRunner(SPECIES_QUERY, {})
    expect(response.data).toHaveProperty('species')
  })
})
