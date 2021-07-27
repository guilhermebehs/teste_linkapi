import { SynchronizeOrders } from './protocols/syncronize-orders'
import { SynchronizeOrdersController } from './sync-orders-controller'

interface SutTypes {
  syncronizeOrdersStub: SynchronizeOrders
  sut: SynchronizeOrdersController
}

const makeSynchronizeOrdersStub = (): SynchronizeOrders => {
  class SynchronizeOrdersStub implements SynchronizeOrders {
    async synchronize (): Promise<void> {
      return new Promise((resolve) => resolve())
    }
  }
  return new SynchronizeOrdersStub()
}

const makeSut = (): SutTypes => {
  const syncronizeOrdersStub = makeSynchronizeOrdersStub()
  const sut = new SynchronizeOrdersController(syncronizeOrdersStub)
  return { sut, syncronizeOrdersStub }
}

describe('SynchronizeOrdersController', () => {
  test('Should call method synchronize() from SynchronizeOrders once', async () => {
    const { sut, syncronizeOrdersStub } = makeSut()
    const syncronizeOrdersSpy = jest.spyOn(syncronizeOrdersStub, 'synchronize')
    await sut.synchronize()
    expect(syncronizeOrdersSpy).toHaveBeenCalledTimes(1)
  })
})
