const { db } = require('./../../db')

module.exports = {
  Query: {
    getMarks: async (parent, args, context, info) => {
      return db.manyOrNone(`
        select
          id, animal_id, mark_id, mark_type, mark_color,
          mark_location, notes, created_at, updated_at
        from marks
      `)
    }
  }
}