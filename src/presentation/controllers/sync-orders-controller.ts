import { InternalError } from './errors/internal-error'
import { HttpResponse } from './protocols/http-response'
import { SynchronizeOrders } from './protocols/syncronize-orders'

export class SynchronizeOrdersController {
  constructor (private readonly syncronizeOrders: SynchronizeOrders) {}
  async synchronize (): Promise<HttpResponse> {
    try {
      await this.syncronizeOrders.synchronize()
      return {
        statusCode: 201,
        body: { message: 'sincronizado.' }
      }
    } catch (e) {
      return {
        statusCode: 500,
        body: new InternalError()
      }
    }
  }
}
