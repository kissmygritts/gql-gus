const { makeExecutableSchema } = require('graphql-tools')
const { graphql } = require('graphql')
const { pgp } = require('./../../db')
const { typeDefs, resolvers } = require('./..')

const schema = makeExecutableSchema({ typeDefs, resolvers })
const gqlRunner = (query, variables) => {
  return graphql(schema, query, null, {}, variables)
}

const ANIMAL_ENCOUNTER_QUERY = /* GraphQL */`
  query {
    getAnimalEncounters {
      id
      animal_id
      species_id
    }
  }
`

const ANIMAL_ENCOUNTER_QUERY_WITH_PAGINATION = /* GraphQL */`
  query {
    getAnimalEncounters (
      limit: {
        first: 3
        offset: 5
      }
    ) {
      id
      animal_id
      species_id
    }
  }
`

const ANIMAL_ENCOUNTER_QUERY_WITH_FILTER = /* GraphQL */`
  query {
    getAnimalEncounters (
      limit: {
        first: 1
      },
      filter: {
        common_name: { like: "%deer%"}
      }
    ) {
      common_name
    }
  }
`

afterAll(() => {
  return pgp.end()
})

describe('getAnimalEncounters query', () => {
  test('should return array of data', async () => {
    const response = await gqlRunner(ANIMAL_ENCOUNTER_QUERY, {})
    expect(response.data.getAnimalEncounters).toBeInstanceOf(Array)
  })
})

describe('getAnimalEncounters query: offset pagination', () => {
  test('should return data with limit arguments', async () => {
    const response = await gqlRunner(ANIMAL_ENCOUNTER_QUERY_WITH_PAGINATION, {})
    expect(response.data.getAnimalEncounters).toBeInstanceOf(Array)
  })

  test('response data has 3 items', async () => {
    const response = await gqlRunner(ANIMAL_ENCOUNTER_QUERY_WITH_PAGINATION, {})
    expect(response.data.getAnimalEncounters).toHaveLength(3)
  })
})

describe('getAnimalEncounters query: filter arg', () => {
  test('should return data with filter arg', async () => {
    const response = await gqlRunner(ANIMAL_ENCOUNTER_QUERY_WITH_FILTER, {})
    expect(response.data.getAnimalEncounters).toBeInstanceOf(Array)
  })

  test('response has common_name is mule deer', async () => {
    // this requires a seeded database
    const response = await gqlRunner(ANIMAL_ENCOUNTER_QUERY_WITH_FILTER, {})
    expect(response.data.getAnimalEncounters[0].common_name).toBe('mule deer')
  })
})
