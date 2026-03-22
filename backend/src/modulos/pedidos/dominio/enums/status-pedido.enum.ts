export enum StatusPedido {
  PENDENTE = 'PENDENTE',
  PROCESSANDO = 'PROCESSANDO',
  CONCLUIDO = 'CONCLUIDO',
  CANCELADO = 'CANCELADO',
}

export const TRANSICOES_VALIDAS: Record<StatusPedido, StatusPedido[]> = {
  [StatusPedido.PENDENTE]: [StatusPedido.PROCESSANDO, StatusPedido.CANCELADO],
  [StatusPedido.PROCESSANDO]: [StatusPedido.CONCLUIDO, StatusPedido.CANCELADO],
  [StatusPedido.CONCLUIDO]: [],
  [StatusPedido.CANCELADO]: [],
};
