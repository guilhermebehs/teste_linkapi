import { GetOrdersController } from './../controllers/get-orders-controller'
import { HttpResponse } from '../controllers/protocols/http-response'
import { HttpRequest } from './protocols/http-request'
import { Router } from './protocols/router'
export class GetOrdersRouter implements Router {
  constructor (private readonly getOrdersController: GetOrdersController) {}
  async route (request: HttpRequest): Promise<HttpResponse> {
    return await this.getOrdersController.get()
  }
}
