// import { graphql } from 'graphql'
// import { makeExecutableSchema } from 'graphql-tools'
// import { typeDefs, resolvers } from '..'
// import { pgp } from '../../db'
import { msg, typeDefs } from '..'
console.log(msg)
console.log(typeDefs)
// // FIXME: getting the error 'Must provide typeDefs here
// console.log(typeDefs)
// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers
// })

// const SPECIES_QUERY = /* GraphQL */`
//   query {
//     species {
//       id
//       common_name
//       species_name
//     }
//   }
// `

// // a graphql query runner, this will call the graphql api
// const gqlRunner = (query, variables) => {
//   return graphql(schema, query, null, {}, variables)
// }

// describe('Species', () => {
//   test('return data', async () => {
//     const response = await gqlRunner(SPECIES_QUERY, {})
//     expect(response.data).toHaveProperty('species')
//     pgp.end()
//   })
// })
