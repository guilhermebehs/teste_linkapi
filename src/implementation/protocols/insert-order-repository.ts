import { OrderModel } from '../../domain/models/order'
export interface InsertOrderRepository{
  insert: (order: OrderModel) => Promise<OrderModel | undefined>
}
