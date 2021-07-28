import { GetOrdersMongoRepository } from './get-orders-mongo-repository'
import { MongoHelper } from './utils/mongo-helper'
const ordersToInsert = [
  {
    id: '1',
    clientName: 'any_name',
    salerName: 'any_name',
    wonTime: '2020-02-01',
    products: []
  },
  {
    id: '2',
    clientName: 'any_name2',
    salerName: 'any_name2',
    wonTime: '2021-03-05',
    products: []
  },
  {
    id: '3',
    clientName: 'any_name3',
    salerName: 'any_name3',
    wonTime: '2012-03-10',
    products: []
  }
]

interface SutTypes{
  sut: GetOrdersMongoRepository
}

const makeSut = (): SutTypes => {
  const sut = new GetOrdersMongoRepository()
  return { sut }
}

describe('GetOrdersMongo Repository', () => {
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
  test('Should return all inserted orders when exists', async () => {
    const { sut } = makeSut()
    const orderCollection = await MongoHelper.getCollection('order')
    await orderCollection.insertMany(ordersToInsert)
    const orders = await sut.get()
    expect(orders).toEqual(ordersToInsert)
  })
})
