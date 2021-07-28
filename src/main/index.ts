import { MongoClient } from 'mongodb'
import { App } from './app'
import dotenv from 'dotenv'
dotenv.config()
const port = process.env.MONGO_URL ?? ''
MongoClient.connect(port)
  .then(() => {
    const app = new App().createApp()
    const port = process.env.PORT ?? 3000
    app.listen(port, () => console.log(`Running on port ${port}`))
  })
  .catch(console.error)
