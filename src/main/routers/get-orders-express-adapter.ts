import { GetOrdersRouter } from './../../presentation/routers/get-orders-router'
import { Request, Response } from 'express'
import { ExpressAdapter } from '../adapters/express-adapter'
export class GetOrdersExpressAdapter implements ExpressAdapter {
  constructor (private readonly getOrdersRouter: GetOrdersRouter) {}
  async adapt (request: Request, response: Response): Promise<void> {
    const httpResponse = await this.getOrdersRouter.route({})
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
