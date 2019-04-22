const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

const app = express()

const schema = gql`
  type Query {
    me: User
  }

  type User {
    username: String!
  }
`

const resolvers = {
  Query: {
    me: () => {
      return {
        username: 'Mitchell Gritts'
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
})

server.applyMiddleware({ app, path: '/graphql' })

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql')
})
