import { SyncOrdersExpressAdapterComposer } from './composers/sync-orders-express-adapter-composer'
import express, { Request, Response } from 'express'

export class App {
  createApp (): any {
    const app = express()
    const syncOrdersExpressAdapter = SyncOrdersExpressAdapterComposer.compose()

    app.post('/sync-orders', async (req, res) => syncOrdersExpressAdapter.adapt(req, res))
    return app
  }
}
