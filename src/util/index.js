const { pgp } = require('./../db')

exports.offsetPagination = limitArgs => {
  // function to generate offset pagination sql statements
  if (limitArgs) {
    const { first, offset } = limitArgs
    console.log(pgp)

    const offsetSql = offset ? pgp.as.format('offset $1', offset) : ''
    const firstSql = first ? pgp.as.format('limit $1', first) : ''

    if (!first) return offsetSql
    if (!offset) return firstSql

    return offsetSql + ' ' + firstSql
  } else {
    return ''
  }
}

// GENERATE WHERE CLAUSE
const operators = {
  eq: '=',
  gte: '>=',
  gt: '>',
  lte: '<=',
  lt: '<',
  neq: '!=',
  in: 'IN',
  like: '~~'
}

const getOperator = clauseObj => operators[Object.keys(clauseObj)[0]]
const getCriteria = clauseObj => Object.values(clauseObj)[0]

const parseFilter = filter => Object.keys(filter)
  .map(field => ({
    field,
    operator: getOperator(filter[field]),
    criteria: getCriteria(filter[field])
  }))

const filterToWhere = criteriaArray => criteriaArray
  .map(m => pgp.as.format('$/field:name/ $/operator:raw/ $/criteria/', m))
  .reduce((acc, curr) => acc + ' AND ' + curr)

// This is the function that will generate the sql where clause
exports.sqlizeFilter = filter => {
  if (filter) {
    return pgp.as.format(' where $1:raw ', filterToWhere(parseFilter(filter)))
  } else {
    return ''
  }
}

exports.pipe = (...fns) => x => fns.reduce((y, f) => f(y), x)
