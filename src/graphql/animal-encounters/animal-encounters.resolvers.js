const { db } = require('./../../db')
const animalEncounters = require('./../../services/animal-encounters')
const biometrics = require('./../../services/biometrics')

module.exports = {
  Query: {
    getAnimalEncounters: async (parent, args, context, info) => animalEncounters.all(args)
  },

  AnimalEncounter: {
    biometrics: async (parent, args, context, info) => biometrics.LoadBiometricsAsChildProp.load(parent.id),
    marks: async (parent, args, context, info) => db.animalEncounters.markLoader.load(parent.animal_id),
    medications: async (parent, args, context, info) => db.animalEncounters.medicationLoader.load(parent.id),
    samples: async (parent, args, context, info) => db.animalEncounters.sampleLoader.load(parent.id),
    vitals: async (parent, args, context, info) => db.animalEncounters.vitalLoader.load(parent.id)
  }
}
