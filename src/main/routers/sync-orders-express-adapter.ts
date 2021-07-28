import { SyncOrdersRouter } from './../../presentation/routers/sync-orders-router'
import { Request, Response } from 'express'
import { ExpressAdapter } from './../adapters/express-adapter'
export class SyncOrdersExpressAdapter implements ExpressAdapter {
  constructor (private readonly syncOrdersRouter: SyncOrdersRouter) {}
  async adapt (request: Request, response: Response): Promise<void> {
    const httpResponse = await this.syncOrdersRouter.route({})
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
