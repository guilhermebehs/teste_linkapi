import { OrderModel } from '../../domain/models/order'
export interface GetOrdersRepository{
  get: () => Promise<OrderModel[]>
}
