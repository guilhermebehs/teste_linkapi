import { GetOrdersRepository } from './protocols/get-orders-repository'
import { OrderModel } from '../domain/models/order'
import { GetOrders } from './../domain/use-cases/get-orders'
export class GetOrdersUseCases implements GetOrders {
  constructor (private readonly getOrdersRepository: GetOrdersRepository) {}
  async get (): Promise<OrderModel[]> {
    return await this.getOrdersRepository.get()
  }
}
