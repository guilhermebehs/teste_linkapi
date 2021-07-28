import { OrderModel } from './../../../domain/models/order'
import { InsertOrderMongoRepository } from './insert-order-mongo-repository'
import { MongoHelper } from './utils/mongo-helper'
import { InsertOrderRepository } from '../../../implementation/protocols/insert-order-repository'
interface SutTypes{
  sut: InsertOrderRepository
}

const makeSut = (): SutTypes => {
  const sut = new InsertOrderMongoRepository()
  return { sut }
}

describe('InsertOrderMongo Repository', () => {
  beforeAll(async () => {
    const mongoUrl = process.env.MONGO_URL ?? ''
    await MongoHelper.connect(mongoUrl)
  })
  afterEach(async () => {
    const orderCollection = await MongoHelper.getCollection('order')
    await orderCollection.deleteMany({})
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  test('Should insert and return correct data', async () => {
    const { sut } = makeSut()
    const orderCollection = await MongoHelper.getCollection('order')
    const insertedOrder: OrderModel = {
      id: '1',
      clientName: 'any_name',
      salerName: 'any_name',
      wonTime: '2020-02-01',
      totalValue: 100,
      products: []
    }
    await sut.insert(insertedOrder)
    const order = await orderCollection.findOne({ id: '1' })
    expect(order).toEqual(insertedOrder)
  })
})
