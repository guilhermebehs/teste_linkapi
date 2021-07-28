import { GetGroupedOrdersController } from '../controllers/get-grouped-orders-controller'
import { HttpResponse } from '../controllers/protocols/http-response'
import { HttpRequest } from './protocols/http-request'
import { Router } from './protocols/router'
export class GetGroupedOrdersRouter implements Router {
  constructor (private readonly getGroupedOrdersController: GetGroupedOrdersController) {}
  async route (request: HttpRequest): Promise<HttpResponse> {
    return await this.getGroupedOrdersController.get()
  }
}
