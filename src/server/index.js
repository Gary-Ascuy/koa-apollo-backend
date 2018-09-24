import Koa from 'koa'
import { ApolloServer } from 'apollo-server-koa'

import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'
import '../fake/asyncGenerator'

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
