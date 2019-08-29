const { db } = require('./../../db')

module.exports = {
  Query: {
    getAnimalEncounters: async (parent, args, context, info) => {
      return db.animalEncounters.all(args)
    }
  },

  AnimalEncounter: {
    biometrics: async (parent, args, context, info) => db.animalEncounters.biometricLoader.load(parent.id),
    marks: async (parent, args, context, info) => db.animalEncounters.markLoader.load(parent.animal_id),
    medications: async (parent, args, context, info) => db.animalEncounters.medicationLoader.load(parent.id),
    samples: async (parent, args, context, info) => db.animalEncounters.sampleLoader.load(parent.id),
    vitals: async (parent, args, context, info) => db.animalEncounters.vitalLoader.load(parent.id)
  }
}
