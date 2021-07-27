export interface OpportunityProductModel{
  id: string
  description: string
  quantity: number
  value: number
}
export interface OpportunityModel {
  id: string
  salerId: string
  salerName: string
  clientId: string
  clientName: string
  wonTime: string
  products: OpportunityProductModel
}
