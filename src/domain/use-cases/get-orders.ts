import { OrderModel } from '../models/order'

export interface GetOrders{
  get: () => Promise<OrderModel[]>
}
