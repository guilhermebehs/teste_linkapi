import { GroupedOrders } from '../models/grouped-orders'

export interface GetGroupedOrders{
  get: () => Promise<GroupedOrders[]>
}
