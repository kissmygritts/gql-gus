const { db, pgp } = require('./../../db')

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

const sqlizeFilter = criteriaArray => criteriaArray
  .map(m => pgp.as.format('$/field:name/ $/operator:raw/ $/criteria/', m))
  .reduce((acc, curr) => acc + ' AND ' + curr)

const filterToWhere = filter => sqlizeFilter(parseFilter(filter))



module.exports = {
  Query: {
    species: async (parent, args, context, info) => {
      let sql
      if (args.filter) {
        sql = pgp.as.format('select id, common_name, species_name, subspecies from species where $1:raw',
                                filterToWhere(args.filter))
      } else {
        sql = 'select id, common_name, species_name, subspecies from species'
      }
      return db.many(sql)
    }
  }
}
