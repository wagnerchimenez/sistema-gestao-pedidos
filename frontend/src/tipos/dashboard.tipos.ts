import { StatusPedido } from './pedido.tipos'

export interface EstatisticasPorStatus {
  status: StatusPedido
  quantidade: number
}

export interface FaturamentoPorDia {
  data: string
  valor: number
}

export interface EstatisticasDashboard {
  totalPedidos: number
  pedidosPorStatus: EstatisticasPorStatus[]
  faturamentoTotal: number
  ticketMedio: number
  faturamentoPorDia: FaturamentoPorDia[]
}
