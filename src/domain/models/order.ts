export interface OrderProductModel{
  id: string
  description: string
}
export interface OrderModel {
  id: string
  clientName: string
  salerName: string
  wonTime: string
  totalValue: number
  products: OrderProductModel[]
}
