import { GetGroupedOrdersRouter } from '../../presentation/routers/get-grouped-orders-router'
import { Request, Response } from 'express'
import { ExpressAdapter } from '../adapters/express-adapter'
export class GetGroupedOrdersExpressAdapter implements ExpressAdapter {
  constructor (private readonly getGroupedOrdersRouter: GetGroupedOrdersRouter) {}
  async adapt (request: Request, response: Response): Promise<void> {
    const httpResponse = await this.getGroupedOrdersRouter.route({})
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
