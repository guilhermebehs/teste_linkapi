import { GetOrdersController } from './get-orders-controller'
import { OrderModel } from '../../domain/models/order'
import { GetOrders } from './../../domain/use-cases/get-orders'
import { InternalError } from './errors/internal-error'

const data = [{
  id: '1',
  clientName: 'any_name',
  salerName: 'any_name',
  products: [],
  wonTime: '2020-01-02'
}]

class GetOrdersStub implements GetOrders {
  async get (): Promise<OrderModel[]> {
    return data
  }
}

interface SutTypes {
  sut: GetOrdersController
  getOrdersStub: GetOrdersStub
}

const makeGetOrdersStub = (): GetOrders => {
  return new GetOrdersStub()
}

const makeSut = (): SutTypes => {
  const getOrdersStub = makeGetOrdersStub()
  const sut = new GetOrdersController(getOrdersStub)
  return { sut, getOrdersStub }
}

describe('GetOrdersController', () => {
  test('Should return 500 if GetOrders throws', async () => {
    const { sut, getOrdersStub } = makeSut()
    jest.spyOn(getOrdersStub, 'get').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.get()
    expect(httpResponse).toBeTruthy()
    expect(httpResponse.body).toEqual(new InternalError())
    expect(httpResponse.statusCode).toBe(500)
  })
})
