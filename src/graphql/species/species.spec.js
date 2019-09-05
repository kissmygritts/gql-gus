const { makeExecutableSchema } = require('graphql-tools')
const { graphql } = require('graphql')
const { db, pgp } = require('./../../db')
const { typeDefs, resolvers } = require('./..')
const species = require('./../../tests/species-fixture.json')

// BEFORE EVERY TESTS
// 1. clear species table
db.none('truncate species restart identity cascade')
// 2. seed species table
const columns = Object.keys(species[0])
db.any(pgp.helpers.insert(species, columns, 'species'))
// 3. run test
// 4. close connection
pgp.end()

const schema = makeExecutableSchema({ typeDefs, resolvers })
const gqlRunner = (query, variables) => {
  return graphql(schema, query, null, {}, variables)
}

beforeAll(() => {
  // delete any existing data before running tests
  db.none('truncate species restart identity cascade')

  // seed database before running tests
  const columns = Object.keys(species[0])
  db.any(pgp.helpers.insert(species, columns, 'species'))
})

afterAll(() => {
  // delete any data added to the database
  db.none('truncate species restart identity cascade')

  // close connection to database (wont every end without closing connection)
  pgp.end()
})

const GET_SPECIES_QUERY = /* GraphQL */`
  query (
    $filterVars: SpeciesFilterInput
    $limitVars: OffsetPaginationInput
  ) {
    getSpecies (
      filter: $filterVars
      limit: $limitVars
    ) {
      id
      common_name
      species_name
    }
  }
`
// const SPECIES_QUERY_FILTER = /* GraphQL */`
//     query {
//       getSpecies (
//         filter: {
//           common_name: { like: "%deer%" }
//         }
//       ){
//         common_name
//         species_name
//         id
//       }
//     }
//   `

// const SPECIES_QUERY_LIMIT = /* GraphQL */`
//     query {
//       getSpecies (
//         limit: { first: 2 }
//       ){
//         common_name
//         species_name
//         id
//       }
//     }
//   `

describe('species query', () => {
  test('should return data without any args', async () => {
    const response = await gqlRunner(GET_SPECIES_QUERY, {})
    expect(response).toHaveProperty('data')
  })
})

//   test('data.species should be an array', async () => {
//     const response = await gqlRunner(SPECIES_QUERY, {})
//     expect(response.data.getSpecies).toBeInstanceOf(Array)
//   })

//   test('data.species[0] should have subspecies property', async () => {
//     const response = await gqlRunner(SPECIES_QUERY, {})
//     expect(response.data.getSpecies[0]).toHaveProperty('subspecies')
//   })
// })

// describe('species query: filter', () => {
//   test('should return data with filter argument', async () => {
//     const response = await gqlRunner(SPECIES_QUERY_FILTER, {})
//     expect(response).toHaveProperty('data')
//   })

//   test(`filter: { common_name: { like: "%deer%" } } returns 8 records'`, async () => {
//     const response = await gqlRunner(SPECIES_QUERY_FILTER, {})
//     expect(response.data.getSpecies).toHaveLength(8)
//   })
// })

// describe('species query: limit', () => {
//   test('should return data with limit argument', async () => {
//     const response = await gqlRunner(SPECIES_QUERY_LIMIT, {})
//     expect(response).toHaveProperty('data')
//   })

//   test('limit: { first: 2 } returns 2 records', async () => {
//     const response = await gqlRunner(SPECIES_QUERY_LIMIT, {})
//     expect(response.data.getSpecies).toHaveLength(2)
//   })
