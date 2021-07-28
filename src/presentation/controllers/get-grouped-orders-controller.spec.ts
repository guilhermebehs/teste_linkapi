import { GetGroupedOrdersController } from './get-grouped-orders-controller'
import { GroupedOrdersModel } from './../../domain/models/grouped-orders'
import { GetGroupedOrders } from '../../domain/use-cases/get-grouped-orders'
import { InternalError } from './errors/internal-error'

const totalPorDia = [{
  data: '2020-01-02',
  valorTotal: 200
}]

class GetGroupedOrdersStub implements GetGroupedOrders {
  async get (): Promise<GroupedOrdersModel[]> {
    return totalPorDia
  }
}

interface SutTypes {
  sut: GetGroupedOrdersController
  getGroupedOrdersStub: GetGroupedOrdersStub
}

const makeGetGroupedOrdersStub = (): GetGroupedOrders => {
  return new GetGroupedOrdersStub()
}

const makeSut = (): SutTypes => {
  const getGroupedOrdersStub = makeGetGroupedOrdersStub()
  const sut = new GetGroupedOrdersController(getGroupedOrdersStub)
  return { sut, getGroupedOrdersStub }
}

describe('GetGroupedOrdersController', () => {
  test('Should return 500 if GetGroupedOrders throws', async () => {
    const { sut, getGroupedOrdersStub } = makeSut()
    jest.spyOn(getGroupedOrdersStub, 'get').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.get()
    expect(httpResponse).toBeTruthy()
    expect(httpResponse.body).toEqual(new InternalError())
    expect(httpResponse.statusCode).toBe(500)
  })
  test('Should return 200 and grouped orders when success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.get()
    expect(httpResponse).toBeTruthy()
    expect(httpResponse.body).toEqual({ totalPorDia })
    expect(httpResponse.statusCode).toBe(200)
  })
})
