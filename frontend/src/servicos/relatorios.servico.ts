import api from './api'
import { StatusPedido } from '../tipos/pedido.tipos'

interface SolicitarRelatorioInput {
  status?: StatusPedido
  dataInicio?: string
  dataFim?: string
}

interface StatusRelatorio {
  jobId: string
  estado: string
  progresso: number
  concluidoEm: string | null
  erro: string | null
}

export const relatoriosServico = {
  async solicitar(input: SolicitarRelatorioInput): Promise<{ jobId: string; mensagem: string }> {
    const { data } = await api.post('/relatorios/gerar', input)
    return data
  },

  async verificarStatus(jobId: string): Promise<StatusRelatorio> {
    const { data } = await api.get<StatusRelatorio>(`/relatorios/${jobId}/status`)
    return data
  },

  obterUrlDownload(jobId: string): string {
    const baseUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001'
    return `${baseUrl}/relatorios/${jobId}/download`
  },
}
