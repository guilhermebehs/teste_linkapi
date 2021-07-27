import { OpportunityModel } from '../../domain/models/opportunity'
import { OpportunityAdapter } from './../../implementation/protocols/opportunity-adapter'
import axios from 'axios'
export class OpportunityPipedriveAdapter implements OpportunityAdapter {
  async import (): Promise<OpportunityModel[]> {
    const result = await axios({
      url: 'https://nenhuma.pipedrive.com/api/v1/deals?api_token=5bd7ab68960788c5c85133e6d9e3e7fbcd3e7f38&status=won',
      method: 'GET'
    })
    const { data } = result
    return this.mapDataToOpportunity(data)
  }

  private mapDataToOpportunity (data: any[]): OpportunityModel[] {
    if (!data) return []
    const opportunities: OpportunityModel[] = data.map((d) => {
      return {
        id: String(d.id),
        wonTime: d.won_time,
        clientName: d.person_id.name,
        salerName: d.owner_name,
        products: [{
          id: '1',
          description: 'produto',
          value: d.value
        }]
      }
    })
    return opportunities
  }
}
