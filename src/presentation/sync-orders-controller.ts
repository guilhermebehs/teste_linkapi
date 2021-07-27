import { SynchronizeOrders } from './protocols/syncronize-orders'

export class SynchronizeOrdersController {
  constructor (private readonly syncronizeOrders: SynchronizeOrders) {}
  async synchronize (): Promise<void> {
    await this.syncronizeOrders.synchronize()
  }
}
