const express = require('express')
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./graphql')
const port = 8081

const app = express()
app.use(cors())

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.applyMiddleware({ app, path: '/graphql', cors: false })

app.listen({ port }, () => {
  console.log(`Apollo Server on http://localhost:${port}/graphql`)
})
