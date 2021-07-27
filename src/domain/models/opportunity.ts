export interface OpportunityProductModel{
  id: string
  description: string
  value: number
}
export interface OpportunityModel {
  id: string
  salerName: string
  clientName: string
  wonTime: string
  products: OpportunityProductModel[]
}
