import { created, serverError } from './../../helpers/http-helper'
import { HttpResponse } from './protocols/http-response'
import { SynchronizeOrders } from './protocols/syncronize-orders'

export class SynchronizeOrdersController {
  constructor (private readonly syncronizeOrders: SynchronizeOrders) {}
  async synchronize (): Promise<HttpResponse> {
    try {
      await this.syncronizeOrders.synchronize()
      return created({ message: 'sincronizado.' })
    } catch (e) {
      return serverError()
    }
  }
}
