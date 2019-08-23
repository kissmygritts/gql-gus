const cs = [
  {
    name: 'id'
  }, {
    name: 'encounter_id'
  }, {
    name: 'medication'
  }, {
    name: 'med_time'
  }, {
    name: 'med_dose'
  }, {
    name: 'med_unit'
  }, {
    name: 'med_method'
  }, {
    name: 'med_notes'
  }
]

class MedicationsRepository {
  constructor (db, pgp) {
    this.db = db
    this.pgp = pgp
    this.cs = new pgp.helpers.ColumnSet(cs, { table: 'samples' })
  }

  async findByEncounterIds (ids) {
    return this.db.any('select * from medications where encounter_id in ($/ids:csv/)', ids)
  }
}

module.exports = MedicationsRepository
