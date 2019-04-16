import { db } from '../../db'

export default {
  Query: {
    species: async (root, args, ctx, info) => {
      const response = await db.many('select id, common_name, species_name from species limit 5')
      return response
    }
  }
}
