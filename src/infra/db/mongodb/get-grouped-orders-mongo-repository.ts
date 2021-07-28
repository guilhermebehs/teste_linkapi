import { GetGroupedOrdersRepository } from '../../../implementation/protocols/get-grouped-orders-repository'
import { GroupedOrdersModel } from '../../../domain/models/grouped-orders'
import { MongoHelper } from './utils/mongo-helper'
export class GetGroupedOrdersMongoRepository implements GetGroupedOrdersRepository {
  async get (): Promise<GroupedOrdersModel[]> {
    const collection = await MongoHelper.getCollection('order')
    const groupedOrders: GroupedOrdersModel[] = await collection.aggregate([
      {
        $group:
         {
           _id: { wonTime: '$wonTime' },
           totalValue: { $sum: '$totalValue' }
         }
      },
      {
        $project: {
          _id: 0,
          data: '$_id.wonTime',
          valorTotal: '$totalValue'
        }
      }
    ]).toArray()
    const sortedAndGroupedOrders = this.sortGroupedOrders(groupedOrders)
    return sortedAndGroupedOrders
  }

  private sortGroupedOrders (groupedOrders: GroupedOrdersModel[]): GroupedOrdersModel[] {
    const sortedAndGroupedOrders = groupedOrders.sort((group1, group2) => {
      const group1Date = new Date(group1.data).getTime()
      const group2Date = new Date(group2.data).getTime()
      if (group1Date > group2Date) { return -1 }
      return 1
    }) as unknown as GroupedOrdersModel[]
    return sortedAndGroupedOrders
  }
}
