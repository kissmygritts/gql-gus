const cs = [
  {
    name: 'id'
  }, {
    name: 'encounter_id'
  }, {
    name: 'time_recorded'
  }, {
    name: 'heart_rate'
  }, {
    name: 'respiratory_rate'
  }, {
    name: 'temperature'
  }
]

class VitalsRepository {
  constructor (db, pgp) {
    this.db = db
    this.pgp = pgp
    this.cs = new pgp.helpers.ColumnSet(cs, { table: 'vitals' })
  }

  async findByEncounterIds (ids) {
    return this.db.any('select * from vitals where encounter_id in ($/ids:csv/)', ids)
  }
}

module.exports = VitalsRepository
