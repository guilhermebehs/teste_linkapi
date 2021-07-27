import { OrderModel } from '../../domain/models/order'
export interface ImportOrderAdapter{
  import: () => Promise<OrderModel[]>
}
