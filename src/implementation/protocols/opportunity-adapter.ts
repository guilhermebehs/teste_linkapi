import { OpportunityModel } from './../../domain/models/opportunity'
export interface OpportunityAdapter{
  import: () => Promise<OpportunityModel[]>
}
