export interface OrderProductModel{
  id: string
  description: string
  quantity: number
  value: number
}
export interface OrderModel {
  id: string
  salerId: string
  salerName: string
  clientId: string
  clientName: string
  wonTime: string
  products: OrderProductModel
}
