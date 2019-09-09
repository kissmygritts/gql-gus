const { db, pgp } = require('./../index')
const AnimalEncounterRepo = require('./animal-encounters')
const BiometricRepo = require('./biometrics')
const MarkRepo = require('./marks')
const SampleRepo = require('./samples')
const MedicationRepo = require('./medications')
const VitalRepo = require('./vitals')
const SpeciesRepo = require('./species')

module.exports = {
  AnimalEncounters: AnimalEncounterRepo({ db, pgp }),
  Biometrics: BiometricRepo({ db, pgp }),
  Marks: MarkRepo({ db, pgp }),
  Medications: MedicationRepo({ db, pgp }),
  Samples: SampleRepo({ db, pgp }),
  Species: SpeciesRepo({ db, pgp }),
  Vitals: VitalRepo({ db, pgp })
}
