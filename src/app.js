import { start } from './server'

(async () => {
  try {
    await start()
  } catch (error) {
    console.log(error)
  }
})()