import api from './api'
import {
  AtualizarStatusInput,
  CriarPedidoInput,
  ListaPedidosResposta,
  Pedido,
  StatusPedido,
} from '../tipos/pedido.tipos'

interface FiltrosPedidos {
  status?: StatusPedido
  nomeCliente?: string
  pagina?: number
  itensPorPagina?: number
}

export const pedidosServico = {
  async listar(filtros: FiltrosPedidos = {}): Promise<ListaPedidosResposta> {
    const { data } = await api.get<ListaPedidosResposta>('/pedidos', {
      params: filtros,
    })
    return data
  },

  async buscarPorId(id: string): Promise<Pedido> {
    const { data } = await api.get<Pedido>(`/pedidos/${id}`)
    return data
  },

  async criar(input: CriarPedidoInput): Promise<Pedido> {
    const { data } = await api.post<Pedido>('/pedidos', input)
    return data
  },

  async atualizarStatus(id: string, input: AtualizarStatusInput): Promise<Pedido> {
    const { data } = await api.patch<Pedido>(`/pedidos/${id}/status`, input)
    return data
  },
}
