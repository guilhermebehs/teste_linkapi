import { GetOrdersRepository } from './protocols/get-orders-repository'
import { OrderModel } from './../domain/models/order'
import { GetOrdersUseCases } from './get-orders'

const data = [{
  id: '1',
  clientName: 'any_name',
  salerName: 'any_name',
  products: [],
  wonTime: '2020-01-02'
}]
interface SutTypes {
  getOrdersRepositoryStub: GetOrdersRepository
  sut: GetOrdersUseCases
}

class GetOrdersRepositoryStub implements GetOrdersRepository {
  async get (): Promise<OrderModel[]> {
    return data
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
  test('Should return all orders returned from GetOrdersRepository', async () => {
    const { sut } = makeSut()
    const returnedData = await sut.get()
    await expect(returnedData).toEqual(data)
  })
})
