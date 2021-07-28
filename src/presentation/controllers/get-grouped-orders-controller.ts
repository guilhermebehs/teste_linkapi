import { GetGroupedOrders } from '../../domain/use-cases/get-grouped-orders'
import { InternalError } from './errors/internal-error'
import { HttpResponse } from './protocols/http-response'
export class GetGroupedOrdersController {
  constructor (private readonly getGroupedOrders: GetGroupedOrders) {}
  async get (): Promise<HttpResponse> {
    try {
      const totalPorDia = await this.getGroupedOrders.get()
      return {
        statusCode: 200,
        body: { totalPorDia }
      }
    } catch (e) {
      return {
        statusCode: 500,
        body: new InternalError()
      }
    }
  }
}
