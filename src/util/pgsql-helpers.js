const pgp = require('pg-promise')
const format = pgp.as.format

// turn GraphQL input types into where clause
const operators = {
  eq: '=',
  gte: '>=',
  gt: '>',
  lte: '<=',
  lt: '<',
  neq: '!=',
  in: 'IN',
  like: '~~',
  between: 'between'
}

const getOperator = clauseObj => operators[Object.keys(clauseObj)[0]]
const getCriteria = clauseObj => Object.values(clauseObj)[0]

const parseFilter = filters => Object.keys(filters)
  .map(field => ({
    field,
    operator: getOperator(filters[field]),
    criteria: getCriteria(filters[field])
  }))

const filterToWhereClause = criteriaArray => criteriaArray
  .map(m => {
    if (m.operator === 'between') {
      const criteria = {
        field: m.field,
        low: m.criteria[0],
        high: m.criteria[1]
      }
      return format('$/field:name/ between $/low/ and $/high/', criteria)
    } else {
      return format('$/field:name/ $/operator:raw/ $/criteria/', m)
    }
  })
  .reduce((acc, curr) => acc + ' AND ' + curr)

const sqlizeFilter = filters => {
  if (filters) {
    return format(' where $1:raw ', filterToWhereClause(parseFilter(filters)))
  } else {
    return ''
  }
}

const offsetPagination = (limitArgs) => {
  if (limitArgs) {
    const { first, offset } = limitArgs

    const offsetSql = offset ? format('offset $1', offset) : ''
    const firstSql = first ? format('limit $1', first) : ''

    if (!first) return offsetSql
    if (!offset) return firstSql

    return offsetSql + ' ' + firstSql
  } else {
    return ''
  }
}

module.exports = {
  sqlizeFilter,
  offsetPagination
}
