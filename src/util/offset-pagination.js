const { pgp } = require('./../db')

const offsetPagination = (limitArgs, pgp) => {
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

module.exports = {
  offsetPagination
}
