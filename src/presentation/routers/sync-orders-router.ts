import { SynchronizeOrdersController } from './../controllers/sync-orders-controller'
import { HttpResponse } from '../controllers/protocols/http-response'
import { HttpRequest } from './protocols/http-request'
import { Router } from './protocols/router'
export class SyncOrdersRouter implements Router {
  constructor (private readonly syncOrdersController: SynchronizeOrdersController) {}
  async route (request: HttpRequest): Promise<HttpResponse> {
    return await this.syncOrdersController.synchronize()
  }
}
