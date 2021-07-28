import { GroupedOrders } from '../../domain/models/grouped-orders'
export interface GetGroupedOrdersRepository{
  get: () => Promise<GroupedOrders[]>
}
