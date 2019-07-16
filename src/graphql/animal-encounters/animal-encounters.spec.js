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
    allAnimalEncounters {
      animal_id,
      encounter_id,
      species_id
    }
  }
`

const ANIMAL_ENCOUNTER_QUERY_WITH_PAGINATION = /* GraphQL */`
  query {
    allAnimalEncounters (
      limit: {
        first: 3
        offset: 5
      }
    ) {
      animal_id,
      encounter_id,
      species_id
    }
  }
`

const ANIMAL_ENCOUNTER_QUERY_WITH_FILTER = /* GraphQL */`
  query {
    allAnimalEncounters (
      limit: {
        first: 1
      },
      filter: {
        common_name: { like: "%deer%"}
      }
    ) {
      species_name
      common_name
      ind_id
      life_status
      age_class
      n
    }
  }
`

afterAll(() => {
  return pgp.end()
})

describe('allAnimalEncounters query', () => {
  test('should return array of data', async () => {
    const response = await gqlRunner(ANIMAL_ENCOUNTER_QUERY, {})
    expect(response.data.allAnimalEncounters).toBeInstanceOf(Array)
  })
})

describe('allAnimalEncounters query: offset pagination', () => {
  test('should return data with limit arguments', async () => {
    const response = await gqlRunner(ANIMAL_ENCOUNTER_QUERY_WITH_PAGINATION, {})
    expect(response.data.allAnimalEncounters).toBeInstanceOf(Array)
  })

  test('response data has 3 items', async () => {
    const response = await gqlRunner(ANIMAL_ENCOUNTER_QUERY_WITH_PAGINATION, {})
    expect(response.data.allAnimalEncounters).toHaveLength(3)
  })
})

describe('allAnimalEncounters query: filter arg', () => {
  test('should return data with filter arg', async () => {
    const response = await gqlRunner(ANIMAL_ENCOUNTER_QUERY_WITH_FILTER, {})
    expect(response.data.allAnimalEncounters).toBeInstanceOf(Array)
  })

  test('response has common_name is mule deer', async () => {
    // this requires a seeded database
    const response = await gqlRunner(ANIMAL_ENCOUNTER_QUERY_WITH_FILTER, {})
    expect(response.data.allAnimalEncounters[0].common_name).toBe('mule deer')
  })
})