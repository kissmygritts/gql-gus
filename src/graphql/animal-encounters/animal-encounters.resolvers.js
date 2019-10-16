const animalEncounters = require('./../../services/animal-encounters')
const biometrics = require('./../../services/biometrics')
const labids = require('./../../services/labids')
const labResults = require('./../../services/lab-results')
const marks = require('./../../services/marks')
const medications = require('./../../services/medications')
const samples = require('./../../services/samples')
const vitals = require('./../../services/vitals')

module.exports = {
  Query: {
    getAnimalEncounters: async (parent, args, context, info) => animalEncounters.all(args)
  },

  AnimalEncounter: {
    biometrics: async (parent, args, context, info) => biometrics.LoadBiometricsAsChildProp.load(parent.id),
    labids: async (parent, args, context, info) => {
      if (parent.id) {
        return labids.LoadLabidsAsChildProp.load(parent.id)
      }
    },
    lab_results: async (parent, args, context, info) => {
      if (parent.id) {
        return labResults.LoadLabResultsAsChildProp.load(parent.id)
      }
    },
    marks: async (parent, args, context, info) => {
      // FIXME: if animal_id is null, throws an error (https://github.com/graphql/dataloader/issues/98)
      if (parent.animal_id) {
        return marks.LoadMarksAsChildProp.load(parent.animal_id)
      }
    },
    medications: async (parent, args, context, info) => medications.LoadMedicationsAsChildProp.load(parent.id),
    samples: async (parent, args, context, info) => samples.LoadSamplesAsChildProp.load(parent.id),
    vitals: async (parent, args, context, info) => vitals.LoadVitalsAsChildProp.load(parent.id)
  }
}
