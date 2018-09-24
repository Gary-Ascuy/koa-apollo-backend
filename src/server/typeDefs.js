
export const typeDefs = `
  scalar Object

  type User {
    _id: ID!
    name: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    _currentDate: String!
    user(_id: String): User
    allUsers: [User!]!
  }

  type Mutation {
    createUser(fields: Object): User
    updateUser(_id: String, fields: Object): User
    deleteUser(_id: String): User
  }

  type Subscription {
    watchUsers: User
  }
`
