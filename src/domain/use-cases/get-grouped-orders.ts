import { GroupedOrdersModel } from '../models/grouped-orders'

export interface GetGroupedOrders{
  get: () => Promise<GroupedOrdersModel[]>
}
