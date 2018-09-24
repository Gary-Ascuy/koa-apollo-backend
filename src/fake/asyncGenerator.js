import { pubsub } from '../server/pubsub'
import { getUser } from '../fake/users'

// Events every 10 seconds
setInterval(() => {
  const user = getUser(Math.random() > 0.5 ? 0 : 1)
  pubsub.publish('USERS', user)
}, 10000)
