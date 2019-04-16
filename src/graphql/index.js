import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import path from 'path'

const typesArray = fileLoader(path.join(__dirname, './**/*.graphql'), {
  recursive: true
})
const resolversArray = fileLoader(path.join(__dirname, './**/*.js'), {
  recursive: true
})

export const typeDefs = mergeTypes(typesArray)
export const resolvers = mergeResolvers(resolversArray)
