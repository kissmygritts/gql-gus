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

test.todo('activities query')
test.todo('activities mutations')
