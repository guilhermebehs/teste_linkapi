import { GetOrders } from './../../domain/use-cases/get-orders'
import { InternalError } from './errors/internal-error'
import { HttpResponse } from './protocols/http-response'
export class GetOrdersController {
  constructor (private readonly getOrders: GetOrders) {}
  async get (): Promise<HttpResponse> {
    try {
      const orders = await this.getOrders.get()
      return {
        statusCode: 201,
        body: { orders }
      }
    } catch (e) {
      return {
        statusCode: 500,
        body: new InternalError()
      }
    }
  }
}
