const cs = [
  {
    name: 'id'
  }, {
    name: 'encounter_id'
  }, {
    name: 'measurement'
  }, {
    name: 'value'
  }, {
    name: 'units'
  }
]

class BiometricsRepository {
  constructor (db, pgp) {
    this.db = db
    this.pgp = pgp
    this.cs = new pgp.helpers.ColumnSet(cs, { table: 'biometrics' })
  }

  async all () {
    return this.db.any('SELECT * FROM biometrics')
  }

  async findByEncounterIds (ids) {
    return this.db.any('select * from biometrics where encounter_id in ($/ids:csv/)', ids)
  }
}

module.exports = BiometricsRepository
