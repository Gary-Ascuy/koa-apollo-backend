import { pubsub } from './pubsub'
import { users, getUser } from '../fake/users'

export const resolvers = {
  Query: {
    _currentDate: () => new Date().toISOString(),

    user: (root, {_id}) => users[parseInt(_id, 10)] || users[0],
    allUsers: () => users
  },

  Mutation: {
    createUser: (root, { fields }) => getUser(0),
    updateUser: (root, { _id, fields }) => getUser(_id),
    deleteUser: (root, {_id}) => getUser(_id),
  },

  Subscription: {
    watchUsers: {
      resolve: (payload) => payload,
      subscribe: () => pubsub.asyncIterator(['USERS'])
    }
  }
}
