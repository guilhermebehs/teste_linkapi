import { GetGroupedOrdersRepository } from './protocols/get-grouped-orders-repository'
import { GetGroupedOrders } from '../domain/use-cases/get-grouped-orders'
import { GroupedOrdersModel } from '../domain/models/grouped-orders'
export class GetGroupedOrdersUseCases implements GetGroupedOrders {
  constructor (private readonly getGroupedOrdersRepository: GetGroupedOrdersRepository) {}
  async get (): Promise<GroupedOrdersModel[]> {
    return await this.getGroupedOrdersRepository.get()
  }
}
