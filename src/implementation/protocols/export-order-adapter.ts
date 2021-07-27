import { OrderModel } from '../../domain/models/order'
export interface ExportOrderAdapter{
  export: (products: OrderModel[]) => Promise<void>
}
