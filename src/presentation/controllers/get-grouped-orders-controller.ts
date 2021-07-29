import { serverError, ok } from './../../helpers/http-helper'
import { GetGroupedOrders } from '../../domain/use-cases/get-grouped-orders'
import { HttpResponse } from './protocols/http-response'
export class GetGroupedOrdersController {
  constructor (private readonly getGroupedOrders: GetGroupedOrders) {}
  async get (): Promise<HttpResponse> {
    try {
      const totalPorDia = await this.getGroupedOrders.get()
      return ok({ totalPorDia })
    } catch (e) {
      return serverError()
    }
  }
}
