import { OpportunityModel } from './../../domain/models/opportunity'
import { OrderModel } from '../../domain/models/order'
export interface OrderAdapter{
  import: () => Promise<OrderModel[]>
  export: (opportunities: OpportunityModel[]) => Promise<void>
}
