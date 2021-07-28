import { OpportunityModel } from '../../domain/models/opportunity'
import { OpportunityAdapter } from './../../implementation/protocols/opportunity-adapter'
import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config()
export class OpportunityPipedriveAdapter implements OpportunityAdapter {
  async import (): Promise<OpportunityModel[]> {
    const pipeDriveToken = process.env.PIPEDRIVE_KEY ?? ''
    const result = await axios({
      url: `https://nenhuma.pipedrive.com/api/v1/deals?api_token=${pipeDriveToken}&status=won`,
      method: 'GET'
    })
    const { data } = result
    return this.mapDataToOpportunity(data.data)
  }

  private mapDataToOpportunity (data: any[]): OpportunityModel[] {
    if (!data) return []
    const opportunities: OpportunityModel[] = data.map((d) => {
      return {
        id: String(d.id),
        wonTime: d.won_time.split(' ')[0],
        totalValue: d.value,
        clientName: d.person_name,
        salerName: d.owner_name,
        products: [{
          id: '1',
          description: 'produto'
        }]
      }
    })
    return opportunities
  }
}
