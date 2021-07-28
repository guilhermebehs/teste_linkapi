import { GroupedOrdersModel } from '../../domain/models/grouped-orders'
export interface GetGroupedOrdersRepository{
  get: () => Promise<GroupedOrdersModel[]>
}
