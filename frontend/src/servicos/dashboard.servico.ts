import api from './api'
import { EstatisticasDashboard } from '../tipos/dashboard.tipos'

export const dashboardServico = {
  async obterEstatisticas(): Promise<EstatisticasDashboard> {
    const { data } = await api.get<EstatisticasDashboard>('/dashboard/estatisticas')
    return data
  },
}
