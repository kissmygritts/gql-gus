const { db, pgp } = require('./../index')
const AnimalEncounterRepo = require('./animal-encounters')
const BiometricRepo = require('./biometrics')
const EventRepo = require('./events')
const LabidRepo = require('./labids')
const LabResultRepo = require('./lab-results')
const MarkRepo = require('./marks')
const MedicationRepo = require('./medications')
const ObservationFeedRepo = require('./observation-feed')
const SampleRepo = require('./samples')
const SpeciesRepo = require('./species')
const VitalRepo = require('./vitals')

module.exports = {
  AnimalEncounters: AnimalEncounterRepo({ db, pgp }),
  Biometrics: BiometricRepo({ db, pgp }),
  Events: EventRepo({ db, pgp }),
  Labids: LabidRepo({ db, pgp }),
  LabResults: LabResultRepo({ db, pgp }),
  Marks: MarkRepo({ db, pgp }),
  Medications: MedicationRepo({ db, pgp }),
  ObservationFeed: ObservationFeedRepo({ db, pgp }),
  Samples: SampleRepo({ db, pgp }),
  Species: SpeciesRepo({ db, pgp }),
  Vitals: VitalRepo({ db, pgp })
}
