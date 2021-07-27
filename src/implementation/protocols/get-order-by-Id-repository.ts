import { OrderModel } from './../../domain/models/order'
export interface GetOrderByIdRepository{
  get: (id: number) => Promise<OrderModel | null>
}
