const animalEncounters = require('./../../services/animal-encounters')
const biometrics = require('./../../services/biometrics')
const samples = require('./../../services/samples')
const marks = require('./../../services/marks')
const medications = require('./../../services/medications')
const vitals = require('./../../services/vitals')

module.exports = {
  Query: {
    getAnimalEncounters: async (parent, args, context, info) => animalEncounters.all(args)
  },

  AnimalEncounter: {
    biometrics: async (parent, args, context, info) => biometrics.LoadBiometricsAsChildProp.load(parent.id),
    marks: async (parent, args, context, info) => marks.LoadMarksAsChildProp.load(parent.animal_id),
    medications: async (parent, args, context, info) => medications.LoadMedicationsAsChildProp.load(parent.id),
    samples: async (parent, args, context, info) => samples.LoadSamplesAsChildProp.load(parent.id),
    vitals: async (parent, args, context, info) => vitals.LoadVitalsAsChildProp.load(parent.id)
  }
}
