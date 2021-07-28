import { MongoHelper } from './utils/mongo-helper'
import { OrderModel } from '../../../domain/models/order'
import { InsertOrderRepository } from './../../../implementation/protocols/insert-order-repository'
export class InsertOrderMongoRepository implements InsertOrderRepository {
  async insert (order: OrderModel): Promise<OrderModel | undefined> {
    const collection = await MongoHelper.getCollection('order')
    await collection.insertOne(order)
    const insertedOrder = await collection.findOne({ id: order.id })
    return insertedOrder
  }
}
