import { OrderModel } from '../../domain/models/order'
export interface OrderAdapter{
  export: (orders: OrderModel) => Promise<void>
}
