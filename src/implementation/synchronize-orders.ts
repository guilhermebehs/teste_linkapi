import { ExportOrderAdapter } from './protocols/export-order-adapter'
import { ImportOrderAdapter } from './protocols/import-order-adapter'
import { SynchronizeOrders } from '../domain/use-cases/synchronize-orders'

export class SynchronizeOrdersUseCase implements SynchronizeOrders {
  constructor (
    private readonly importOrderAdapter: ImportOrderAdapter,
    private readonly exportOrderAdapter: ExportOrderAdapter) {}

  async synchronize (): Promise<void> {
    await this.importOrderAdapter.import()
    await this.exportOrderAdapter.export([])
  }
}
