import { GetOrdersExpressAdapterComposer } from './composers/get-orders-express-adapter-composer'
import { SyncOrdersExpressAdapterComposer } from './composers/sync-orders-express-adapter-composer'
import express from 'express'

export class App {
  createApp (): any {
    const app = express()
    const syncOrdersExpressAdapter = SyncOrdersExpressAdapterComposer.compose()
    const getOrdersExpressAdapter = GetOrdersExpressAdapterComposer.compose()

    app.post('/sync-orders', async (req, res) => syncOrdersExpressAdapter.adapt(req, res))
    app.get('/orders', async (req, res) => getOrdersExpressAdapter.adapt(req, res))
    return app
  }
}
