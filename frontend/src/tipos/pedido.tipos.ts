export enum StatusPedido {
  PENDENTE = 'PENDENTE',
  PROCESSANDO = 'PROCESSANDO',
  CONCLUIDO = 'CONCLUIDO',
  CANCELADO = 'CANCELADO',
}

export interface ItemPedido {
  nomeProduto: string
  quantidade: number
  precoUnitario: number
  total: number
}

export interface Pedido {
  id: string
  nomeCliente: string
  emailCliente: string
  status: StatusPedido
  itens: ItemPedido[]
  valorTotal: number
  criadoEm: string
  atualizadoEm: string
}

export interface ListaPedidosResposta {
  dados: Pedido[]
  total: number
  pagina: number
  itensPorPagina: number
}

export interface CriarItemPedidoInput {
  nomeProduto: string
  quantidade: number
  precoUnitario: number
}

export interface CriarPedidoInput {
  nomeCliente: string
  emailCliente: string
  itens: CriarItemPedidoInput[]
}

export interface AtualizarStatusInput {
  status: StatusPedido
}
