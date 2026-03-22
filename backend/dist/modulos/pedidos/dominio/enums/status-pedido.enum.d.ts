export declare enum StatusPedido {
    PENDENTE = "PENDENTE",
    PROCESSANDO = "PROCESSANDO",
    CONCLUIDO = "CONCLUIDO",
    CANCELADO = "CANCELADO"
}
export declare const TRANSICOES_VALIDAS: Record<StatusPedido, StatusPedido[]>;
