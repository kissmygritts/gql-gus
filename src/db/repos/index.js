const { db, pgp } = require('./../index')
const AnimalEncounterRepo = require('./animal-encounters')
const BiometricRepo = require('./biometrics')
const MarkRepo = require('./marks')
const SampleRepo = require('./samples')
const MedicationRepo = require('./medications')
const VitalRepo = require('./vitals')

module.exports = {
  AnimalEncounters: AnimalEncounterRepo({ db, pgp }),
  Biometrics: BiometricRepo({ db, pgp }),
  Marks: MarkRepo({ db, pgp }),
  Medications: MedicationRepo({ db, pgp }),
  Samples: SampleRepo({ db, pgp }),
  Vitals: VitalRepo({ db, pgp })
  // Species: initRepo({ fields: species.fields, table: species.table })
}
