const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas')
const path = require('path')

const typesArray = fileLoader(path.join(__dirname, './**/*.schema.graphql'), {
  recursive: true
})
const resolversArray = fileLoader(path.join(__dirname, './**/*.resolvers.js'), {
  recursive: true
})

exports.typeDefs = mergeTypes(typesArray)
exports.resolvers = mergeResolvers(resolversArray)
