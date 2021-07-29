import { GetGroupedOrders } from './../../domain/use-cases/get-grouped-orders'
import { GetGroupedOrdersRouter } from './get-grouped-orders-router'
import { HttpResponse } from './../controllers/protocols/http-response'
import { GroupedOrdersModel } from '../../domain/models/grouped-orders'
import { GetGroupedOrdersController } from '../controllers/get-grouped-orders-controller'

interface SutTypes{
  getGroupedOrdersStub: GetGroupedOrders
  getGroupedOrdersControllerStub: GetGroupedOrdersController
  sut: GetGroupedOrdersRouter
}

const makeGetGroupedOrdersStub = (): GetGroupedOrders => {
  class GetGroupedOrdersStub implements GetGroupedOrders {
    async get (): Promise<GroupedOrdersModel[]> {
      return [
        {
          data: '02-01-2020',
          valorTotal: 300
        }
      ]
    }
  }
  return new GetGroupedOrdersStub()
}

const makeSut = (): SutTypes => {
  const getGroupedOrdersStub = makeGetGroupedOrdersStub()
  const getGroupedOrdersControllerStub = new GetGroupedOrdersController(getGroupedOrdersStub)
  const sut = new GetGroupedOrdersRouter(getGroupedOrdersControllerStub)
  return { sut, getGroupedOrdersStub, getGroupedOrdersControllerStub }
}

describe('GetGroupedOrders Router', () => {
  test('Should return same data returned by GetGroupedOrdersController', async () => {
    const { sut } = makeSut()
    const httpResponse: HttpResponse = await sut.route({})
    expect(httpResponse).toBeTruthy()
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      totalPorDia: [{
        data: '02-01-2020',
        valorTotal: 300
      }]
    })
  })
})
