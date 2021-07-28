import { InternalError } from './errors/internal-error'
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
  test('Should throw if SynchronizeOrders throws', async () => {
    const { sut, syncronizeOrdersStub } = makeSut()
    jest.spyOn(syncronizeOrdersStub, 'synchronize').mockImplementationOnce(() => { throw new InternalError() })
    const httpResponse = await sut.synchronize()
    expect(httpResponse).toBeTruthy()
    expect(httpResponse.body).toEqual(new InternalError())
    expect(httpResponse.statusCode).toBe(500)
  })
  test('Should return 201 when success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.synchronize()
    expect(httpResponse).toBeTruthy()
    expect(httpResponse.body).toEqual({ message: 'sincronizado.' })
    expect(httpResponse.statusCode).toBe(201)
  })
})
