import { MongoHelper } from './utils/mongo-helper'
import { OrderModel } from '../../../domain/models/order'
import { GetOrderByIdRepository } from './../../../implementation/protocols/get-order-by-Id-repository'
export class GetOrderByIdMongoRepository implements GetOrderByIdRepository {
  async get (id: string): Promise<OrderModel | undefined> {
    const collection = await MongoHelper.getCollection('order')
    const order = await collection.findOne({ id })
    return order
  }
}
