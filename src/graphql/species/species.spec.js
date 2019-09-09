const { makeExecutableSchema } = require('graphql-tools')
const { graphql } = require('graphql')
const { db, pgp } = require('./../../db')
const { typeDefs, resolvers } = require('./..')
const species = require('./../../tests/species-fixture.json')

const schema = makeExecutableSchema({ typeDefs, resolvers })
const gqlRunner = (query, variables) => {
  return graphql(schema, query, null, null, variables)
}

beforeAll(async () => {
  const truncateSql = 'truncate species restart identity cascade'
  const insertSql = pgp.helpers.insert(species, Object.keys(species[0]), 'species')

  await db.any(pgp.helpers.concat([truncateSql, insertSql]))
})

afterAll(async () => {
  await db.none('truncate species restart identity cascade')
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

const GET_SPECIES_BY_ID = /* GraphQL */`
  query ( $id: ID!) {
    getSpeciesById (id: $id) {
      id
    }
  }
`

describe('getSpecies', () => {
  describe('without variables', () => {
    test('should return all results', async () => {
      const response = await gqlRunner(GET_SPECIES_QUERY, {})
      expect(response.data.getSpecies).toHaveLength(species.length)
    })
  })

  describe('with limit variables', () => {
    test('first: 1 returns one result', async () => {
      const response = await gqlRunner(GET_SPECIES_QUERY, { limitVars: { first: 1 } })
      expect(response.data.getSpecies).toHaveLength(1)
    })

    test('if first is negative, return error', async () => {
      const response = await gqlRunner(GET_SPECIES_QUERY, { limitVars: { first: -1 } })
      expect(response).toHaveProperty('errors')
    })

    test('offset: 1 returns two results', async () => {
      const response = await gqlRunner(GET_SPECIES_QUERY, { limitVars: { offset: 1 } })
      expect(response.data.getSpecies).toHaveLength(2)
    })

    test('if offset is negative, return error', async () => {
      const response = await gqlRunner(GET_SPECIES_QUERY, { limitVars: { offset: -1 } })
      expect(response).toHaveProperty('errors')
    })
  })

  describe('with filter variables', () => {
    describe('common name', () => {
      test('like bison', async () => {
        const params = {
          filterVars: {
            common_name: {
              like: '%bison%'
            }
          }
        }
        const { data } = await gqlRunner(GET_SPECIES_QUERY, params)
        expect(data.getSpecies[0]).toHaveProperty('common_name', 'American bison')
      })

      test('equals elk', async () => {
        const params = {
          filterVars: {
            common_name: {
              eq: 'elk'
            }
          }
        }
        const { data } = await gqlRunner(GET_SPECIES_QUERY, params)
        expect(data.getSpecies[0]).toHaveProperty('common_name', 'elk')
      })
    })

    describe('species name', () => {
      test('like Cervus', async () => {
        const params = {
          filterVars: {
            species_name: {
              like: '%Cervus%'
            }
          }
        }
        const res = await gqlRunner(GET_SPECIES_QUERY, params)
        expect(res.data.getSpecies[0]).toHaveProperty('species_name', 'Cervus canadensis')
      })

      test('like is case-sensitive, cervus vs Cervus', async () => {
        const params = {
          filterVars: {
            species_name: {
              like: '%cervus%'
            }
          }
        }
        const res = await gqlRunner(GET_SPECIES_QUERY, params)
        expect(res.data.getSpecies).toHaveLength(0)
      })
    })
  })
})

describe('getSpeciesById', () => {
  test('valid UUID', async () => {
    const res = await gqlRunner(GET_SPECIES_BY_ID, {
      id: species[0].id
    })
    expect(res.data.getSpeciesById).toHaveProperty('id', species[0].id)
  })
})
