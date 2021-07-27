import { GetOrderByIdRepository } from './protocols/get-order-by-Id-repository'
import { InsertOrderRepository } from './protocols/insert-order-repository'
import { OpportunityAdapter } from './protocols/opportunity-adapter'
import { OrderAdapter } from './protocols/order-adapter'
import { SynchronizeOrders } from '../domain/use-cases/synchronize-orders'

export class SynchronizeOrdersUseCase implements SynchronizeOrders {
  constructor (
    private readonly opportunityAdapter: OpportunityAdapter,
    private readonly orderAdapter: OrderAdapter,
    private readonly insertOrderRepository: InsertOrderRepository,
    private readonly getOrderByIdRepository: GetOrderByIdRepository) {}

  async synchronize (): Promise<void> {
    await this.opportunityAdapter.import()
    await this.orderAdapter.export([])
    await this.getOrderByIdRepository.get(1)
    await this.orderAdapter.import()
  }
}
