import { SyncOrdersRouter } from './../../presentation/routers/sync-orders-router'
import { Request, Response } from 'express'
import { ExpressAdapter } from './../adapters/express-adapter'
export class SyncOrdersExpressAdapter implements ExpressAdapter {
  constructor (private readonly syncOrdersRouter: SyncOrdersRouter) {}
  async adapt (request: Request, response: Response): Promise<Response> {
    const httpResponse = await this.syncOrdersRouter.route({})
    return response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
