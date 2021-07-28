import { MongoHelper } from './utils/mongo-helper'
import { GetOrderByIdMongoRepository } from './get-order-by-id-mongo-repository'
import { GetOrderByIdRepository } from './../../../implementation/protocols/get-order-by-Id-repository'
interface SutTypes{
  sut: GetOrderByIdRepository
}

const makeSut = (): SutTypes => {
  const sut = new GetOrderByIdMongoRepository()
  return { sut }
}

describe('GetOrderByIdMongo Repository', () => {
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
  test('Should return order when exists', async () => {
    const { sut } = makeSut()
    const orderCollection = await MongoHelper.getCollection('order')
    await orderCollection.insertOne({
      id: '1',
      clientName: 'any_name',
      salerName: 'any_name',
      wonTime: '2020-02-01',
      totalValue: 100,
      products: []
    })
    const order = await sut.get('1')
    expect(order).toBeTruthy()
  })
  test('Should return undefined when not exists', async () => {
    const { sut } = makeSut()
    const order = await sut.get('1')
    expect(order).toBeFalsy()
  })
})
