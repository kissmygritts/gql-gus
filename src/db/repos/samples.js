const cs = [
  {
    name: 'id'
  }, {
    name: 'encounter_id'
  }, {
    name: 'n_samples'
  }, {
    name: 'notes'
  }
]

class SamplesRepository {
  constructor (db, pgp) {
    this.db = db
    this.pgp = pgp
    this.cs = new pgp.helpers.ColumnSet(cs, { table: 'samples' })
  }

  async findByEncounterIds (ids) {
    return this.db.any('select id, encounter_id, sample, n_samples, notes from samples where encounter_id in ($/ids:csv/)', ids)
  }
}

module.exports = SamplesRepository
