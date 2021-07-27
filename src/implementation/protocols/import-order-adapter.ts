import { RetrievedOrderModel } from './../../domain/models/retrieved-order'
export interface ImportOrderAdapter{
  import: () => Promise<RetrievedOrderModel[]>
}
