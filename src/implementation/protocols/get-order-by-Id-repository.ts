import { OrderModel } from './../../domain/models/order'
export interface GetOrderByIdRepository{
  get: (id: string) => Promise<OrderModel | null>
}
