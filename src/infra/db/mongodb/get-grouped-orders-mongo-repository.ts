import { GetGroupedOrdersRepository } from '../../../implementation/protocols/get-grouped-orders-repository'
import { GroupedOrdersModel } from '../../../domain/models/grouped-orders'
import { MongoHelper } from './utils/mongo-helper'
export class GetGroupedOrdersMongoRepository implements GetGroupedOrdersRepository {
  async get (): Promise<GroupedOrdersModel[]> {
    const collection = await MongoHelper.getCollection('order')
    const orders = await collection.aggregate([
      {
        $group:
         {
           _id: { wonTime: '$wonTime' },
           totalValue: { $sum: '$totalValue' }
         }
      },
      {
        $sort: { wonTime: -1 }
      },
      {
        $project: {
          _id: 0,
          data: '$_id.wonTime',
          valorTotal: '$totalValue'
        }
      }
    ])
    return await orders.toArray()
  }
}
