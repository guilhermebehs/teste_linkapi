export interface OpportunityProductModel{
  id: string
  description: string
}
export interface OpportunityModel {
  id: string
  salerName: string
  clientName: string
  wonTime: string
  totalValue: number
  products: OpportunityProductModel[]
}
