import { OrderModel } from '../../domain/models/order'
export interface OrderAdapter{
  export: (order: OrderModel) => Promise<void>
}
