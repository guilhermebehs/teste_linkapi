import { OrderModel } from './../domain/models/order'
import { OpportunityModel } from './../domain/models/opportunity'
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
    const opportunities = await this.opportunityAdapter.import()
    await this.insertNewOrders(opportunities)
  }

  private async insertNewOrders (opportunities: OpportunityModel[]): Promise<OrderModel[]> {
    const newOrders: OrderModel[] = []
    await Promise.all(opportunities.map(async (opportunity) => {
      const { id } = opportunity
      const orderExists = await this.getOrderByIdRepository.get(id)
      if (!orderExists) {
        const newOrder = this.mapOpportunityToOrder(opportunity)
        await this.insertOrderRepository.insert(newOrder)
        await this.orderAdapter.export(newOrder)
      }
    }))
    return newOrders
  }

  private mapOpportunityToOrder (opportunity: OpportunityModel): OrderModel {
    const { id, products, salerName, wonTime, clientName } = opportunity
    const order: OrderModel = { id, salerName, clientName, products, wonTime }
    return order
  }
}
