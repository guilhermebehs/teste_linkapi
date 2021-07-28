import { MongoHelper } from './utils/mongo-helper'
import { OrderModel } from '../../../domain/models/order'
import { GetOrders } from './../../../domain/use-cases/get-orders'
export class GetOrdersMongoRepository implements GetOrders {
  async get (): Promise<OrderModel[]> {
    const collection = await MongoHelper.getCollection('order')
    const orders = await collection.find({}).toArray()
    return orders
  }
}
