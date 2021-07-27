import { ExportOrderAdapter } from './protocols/export-order-adapter'
import { SynchronizeOrdersUseCase } from './synchronize-orders'
import { ImportOrderAdapter } from './protocols/import-order-adapter'
import { OrderModel } from '../domain/models/order'
import { SynchronizeOrders } from '../domain/use-cases/synchronize-orders'

interface SutTypes {
  importOrderAdapterStub: ImportOrderAdapter
  exportOrderAdapterStub: ExportOrderAdapter
  sut: SynchronizeOrders
}

const makeImportOrderAdapterStub = (): ImportOrderAdapter => {
  class ImportOrderAdapterStub implements ImportOrderAdapter {
    async import (): Promise<OrderModel[]> {
      return []
    }
  }
  return new ImportOrderAdapterStub()
}

const makeExportOrderAdapterStub = (): ExportOrderAdapter => {
  class ExportOrderAdapterStub implements ExportOrderAdapter {
    async export (products: OrderModel[]): Promise<void> {
    }
  }
  return new ExportOrderAdapterStub()
}

const makeSut = (): SutTypes => {
  const importOrderAdapterStub = makeImportOrderAdapterStub()
  const exportOrderAdapterStub = makeExportOrderAdapterStub()
  const sut = new SynchronizeOrdersUseCase(importOrderAdapterStub, exportOrderAdapterStub)
  return { exportOrderAdapterStub, importOrderAdapterStub, sut }
}

describe('SynchronizeOrders UseCase', () => {
  test('Should throws if ImportOrderAdapter throws', async () => {
    const { sut, importOrderAdapterStub } = makeSut()
    jest.spyOn(importOrderAdapterStub, 'import').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.synchronize()
    await expect(promise).rejects.toThrow()
  })
  test('Should throws if ExportOrderAdapter throws', async () => {
    const { sut, exportOrderAdapterStub } = makeSut()
    jest.spyOn(exportOrderAdapterStub, 'export').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.synchronize()
    await expect(promise).rejects.toThrow()
  })
})
