import { HttpResponse } from './../controllers/protocols/http-response'
import { InternalError } from '../controllers/errors/internal-error'
import { SynchronizeOrdersController } from '../controllers/sync-orders-controller'
import { SyncOrdersRouter } from './sync-orders-router'
import { SynchronizeOrders } from '../../domain/use-cases/synchronize-orders'

interface SutTypes{
  syncOrdersStub: SynchronizeOrders
  syncOrdersControllerStub: SynchronizeOrdersController
  sut: SyncOrdersRouter
}

const makeSyncOrdersStub = (): SynchronizeOrders => {
  class SyncOrdersOrdersStub implements SynchronizeOrders {
    async synchronize (): Promise<void> {
    }
  }
  return new SyncOrdersOrdersStub()
}

const makeSut = (): SutTypes => {
  const syncOrdersStub = makeSyncOrdersStub()
  const syncOrdersControllerStub = new SynchronizeOrdersController(syncOrdersStub)
  const sut = new SyncOrdersRouter(syncOrdersControllerStub)
  return { sut, syncOrdersStub, syncOrdersControllerStub }
}

describe('SyncOrders Router', () => {
  test('Should return 500 when SyncOrders throws', async () => {
    const { sut, syncOrdersStub } = makeSut()
    jest.spyOn(syncOrdersStub, 'synchronize').mockImplementationOnce(() => { throw new Error() })
    const httpResponse: HttpResponse = await sut.route({})
    expect(httpResponse).toBeTruthy()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new InternalError())
  })
  test('Should return 201 when SyncOrders success', async () => {
    const { sut } = makeSut()
    const httpResponse: HttpResponse = await sut.route({})
    expect(httpResponse).toBeTruthy()
    expect(httpResponse.statusCode).toBe(201)
  })
})
