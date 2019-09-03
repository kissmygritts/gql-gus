/*
REPO
create a animal-encounter database connection
this connection will run the queries against the database

the repo can have a columnset for use with helpers
the repo can have a sql statement for connection purposes
the repo can be extended
the repo is initialized with optional functions (loaders, formatters, etc)
the repo receives the pgp context to help with formatting

pseudo code:
Repo (options: {obj}, extend: [arr], ctx: {db, pgp})

options {
  fields, \__ these two are used to create a field
  table,  /
  cs,
  sql,
  custom methods
}

extend: an array of methods to add to the repo, for instance
  reusable elements function array
*/

const DataLoader = require('dataloader')
const sql = require('../sql').animalEncounters
const { offsetPagination, sqlizeFilter } = require('./../../util/pgsql-helpers')

const ChildLoader = ({ model, field, db }) => {
  // db is required because of the order in which things are instantiated
  return new DataLoader(async keys => {
    const query = db[model].findBatch({ table: model, field: field, ids: keys })
    const data = await db.any(query)
    return keys.map(k => data.filter(o => o[field] === k))
  })
}

const AnimalEncounterRepo = (db, pgp) => {
  this.db = db
  this.pgp = pgp

  return {
    all: (args) => this.db.any(sql.all, {
      pagination: offsetPagination(args.limit),
      where: sqlizeFilter(args.filter)
    }),

    find: (id) => this.db.any(sql.find, { id }),

    biometricLoader: ChildLoader({ model: 'biometrics', field: 'encounter_id', db: this.db }),
    markLoader: ChildLoader({ model: 'marks', field: 'animal_id', db: this.db }),
    medicationLoader: ChildLoader({ model: 'medications', field: 'encounter_id', db: this.db }),
    sampleLoader: ChildLoader({ model: 'samples', field: 'encounter_id', db: this.db }),
    vitalLoader: ChildLoader({ model: 'vitals', field: 'encounter_id', db: this.db })
  }
}

module.exports = AnimalEncounterRepo
