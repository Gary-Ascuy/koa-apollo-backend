import Koa from 'koa'
import { ApolloServer } from 'apollo-server-koa'
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub()

const typeDefs = `
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

const users = [{
  _id: '0',
  name: 'Gary Ascuy',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}, {
  _id: '1',
  name: 'Yrag Ascuy',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}]

const getUser = (_id) => users[parseInt(_id, 10)] || users[0]

const resolvers = {
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

setInterval(() => {
  const user = getUser(Math.random() > 0.5 ? 0 : 1)
  pubsub.publish('USERS', user)
}, 20000)

export async function start() {
  const host = '0.0.0.0'
  const port = 3666

  // Instances
  const app = new Koa()
  const playground = { settings: {'editor.cursorShape': 'line'} }
  const apolloServer = new ApolloServer({ typeDefs, resolvers, playground, subscriptions: '/subscriptions' })
  
  // API
  apolloServer.applyMiddleware({ app, cors: true })
  const server = app.listen(port, host, () => {
    console.log(`Server Created, Ready to listen at ${host}:${port}${apolloServer.graphqlPath}`)
  })

  // PubSub
  apolloServer.installSubscriptionHandlers(server)
}
