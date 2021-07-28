import { GetOrdersRepository } from './protocols/get-orders-repository'
import { OrderModel } from './../domain/models/order'
import { GetOrdersUseCases } from './get-orders'

interface SutTypes {
  getOrdersRepositoryStub: GetOrdersRepository
  sut: GetOrdersUseCases
}

class GetOrdersRepositoryStub implements GetOrdersRepository {
  async get (): Promise<OrderModel[]> {
    return [{
      id: '1',
      clientName: 'any_name',
      salerName: 'any_name',
      products: [],
      wonTime: '2020-01-02'
    }]
  }
}

const makeGetOrdersRepositoryStub = (): GetOrdersRepository => {
  return new GetOrdersRepositoryStub()
}

const makeSut = (): SutTypes => {
  const getOrdersRepositoryStub = makeGetOrdersRepositoryStub()
  const sut = new GetOrdersUseCases(getOrdersRepositoryStub)
  return { sut, getOrdersRepositoryStub }
}

describe('GetOrders UseCase', () => {
  test('Should throw if GetOrdersRepository throws', async () => {
    const { sut, getOrdersRepositoryStub } = makeSut()
    jest.spyOn(getOrdersRepositoryStub, 'get').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.get()
    await expect(promise).rejects.toThrow()
  })
})
