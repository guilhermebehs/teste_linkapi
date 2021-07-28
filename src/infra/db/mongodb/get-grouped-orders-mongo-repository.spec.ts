import { GroupedOrdersModel } from './../../../domain/models/grouped-orders'
import { GetGroupedOrdersMongoRepository } from './get-grouped-orders-mongo-repository'
import { MongoHelper } from './utils/mongo-helper'
const ordersToInsert = [
  {
    id: '1',
    clientName: 'any_name',
    salerName: 'any_name',
    wonTime: '2020-02-01',
    totalValue: 200,
    products: []
  },
  {
    id: '2',
    clientName: 'any_name2',
    salerName: 'any_name2',
    wonTime: '2021-03-01',
    totalValue: 50,
    products: []
  },
  {
    id: '3',
    clientName: 'any_name3',
    salerName: 'any_name3',
    wonTime: '2021-03-01',
    totalValue: 60,
    products: []
  }
]

interface SutTypes{
  sut: GetGroupedOrdersMongoRepository
}

const makeSut = (): SutTypes => {
  const sut = new GetGroupedOrdersMongoRepository()
  return { sut }
}

describe('GetGroupedOrdersMongo Repository', () => {
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
  test('Should return grouped orders when exists', async () => {
    const { sut } = makeSut()
    const orderCollection = await MongoHelper.getCollection('order')
    await orderCollection.insertMany(ordersToInsert)
    const orders = await sut.get()
    const groupedOrders: GroupedOrdersModel[] = [{
      data: '2021-03-01',
      valorTotal: 110
    },
    {
      data: '2020-02-01',
      valorTotal: 200
    }]
    expect(orders).toEqual(groupedOrders)
  })
})
