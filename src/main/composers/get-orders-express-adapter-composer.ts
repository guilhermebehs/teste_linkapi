import { GetOrdersUseCases } from './../../implementation/get-orders'
import { GetOrdersMongoRepository } from './../../infra/db/mongodb/get-orders-mongo-repository'
import { GetOrdersController } from './../../presentation/controllers/get-orders-controller'
import { GetOrdersRouter } from './../../presentation/routers/get-orders-router'
import { GetOrdersExpressAdapter } from './../routers/get-orders-express-adapter'

export class GetOrdersExpressAdapterComposer {
  static compose (): GetOrdersExpressAdapter {
    const getOrdersMongoRepository = new GetOrdersMongoRepository()
    const getOrdersUseCase = new GetOrdersUseCases(getOrdersMongoRepository)
    const getOrdersController = new GetOrdersController(getOrdersUseCase)
    const getOrdersRouter = new GetOrdersRouter(getOrdersController)
    const getOrdersExpressAdapter = new GetOrdersExpressAdapter(getOrdersRouter)
    return getOrdersExpressAdapter
  }
}
