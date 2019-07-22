const { GraphQLTime, GraphQLDate, GraphQLDateTime } = require('graphql-iso-date')

module.exports = {
  DateTime: GraphQLDateTime,
  Date: GraphQLDate,
  Time: GraphQLTime
}
